import { NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import {
  createSecureJsonResponse,
  validateApiKey,
  validateApiOrigin,
} from "@/lib/security/request";
import {
  validateContactForm,
  validateFormTiming,
  validateHoneypot,
} from "@/lib/security/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 10_240;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

async function deliverContactNotification(data: {
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone?: string;
  country: string;
  productInterests: string[];
  message?: string;
}): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "enterprise@orabthic.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "noreply@orabthic.com";

  if (!resendKey) return;

  const productList = data.productInterests.length
    ? data.productInterests.join(", ")
    : "None specified";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `[Orabthic] Enterprise inquiry from ${data.company}`,
      text: [
        `Name: ${data.fullName}`,
        `Company: ${data.company}`,
        `Title: ${data.jobTitle}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone ?? "N/A"}`,
        `Country: ${data.country}`,
        `Products: ${productList}`,
        "",
        data.message ?? "",
      ].join("\n"),
    }),
  });
}

export async function POST(request: NextRequest) {
  if (!validateApiOrigin(request)) {
    return createSecureJsonResponse({ error: "Forbidden" }, { status: 403 });
  }

  if (!validateApiKey(request)) {
    return createSecureJsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return createSecureJsonResponse({ error: "Unsupported Media Type" }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return createSecureJsonResponse({ error: "Payload Too Large" }, { status: 413 });
  }

  const clientIp = getClientIp(request);
  const rateLimit = await checkRateLimit(`contact:${clientIp}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!rateLimit.allowed) {
    return createSecureJsonResponse(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return createSecureJsonResponse({ error: "Payload Too Large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return createSecureJsonResponse({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = validateContactForm(body);
  if (!parsed.success) {
    return createSecureJsonResponse(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { website, formTimestamp, ...contactData } = parsed.data;

  if (!validateHoneypot(website)) {
    return createSecureJsonResponse({ success: true });
  }

  if (!validateFormTiming(formTimestamp)) {
    return createSecureJsonResponse({ error: "Invalid submission" }, { status: 422 });
  }

  try {
    await deliverContactNotification(contactData);
  } catch {
    return createSecureJsonResponse({ error: "Delivery failed" }, { status: 502 });
  }

  return createSecureJsonResponse(
    { success: true },
    {
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    }
  );
}

export async function GET() {
  return createSecureJsonResponse({ error: "Method Not Allowed" }, { status: 405 });
}
