import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { SECURITY_HEADERS } from "./headers";

const BLOCKED_HEADERS = [
  "x-middleware-subrequest",
  "x-middleware-prefetch",
] as const;

const ALLOWED_ORIGINS = new Set(
  [
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://orabthic.com",
    "https://www.orabthic.com",
    ...(process.env.NODE_ENV === "development"
      ? ["http://localhost:3000", "http://127.0.0.1:3000"]
      : []),
  ].filter(Boolean) as string[]
);

export function validateRequestSecurity(request: NextRequest): NextResponse | null {
  for (const header of BLOCKED_HEADERS) {
    if (request.headers.has(header)) {
      return createSecureJsonResponse({ error: "Forbidden" }, { status: 403 });
    }
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.includes("..") || pathname.includes("\\")) {
    return createSecureJsonResponse({ error: "Bad Request" }, { status: 400 });
  }

  const suspiciousPatterns = [
    /\.\./,
    /%2e%2e/i,
    /%00/,
    /<script/i,
    /javascript:/i,
    /data:text\/html/i,
  ];

  const fullUrl = request.nextUrl.href;
  if (suspiciousPatterns.some((pattern) => pattern.test(fullUrl))) {
    return createSecureJsonResponse({ error: "Bad Request" }, { status: 400 });
  }

  return null;
}

export function validateApiOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (!origin && !referer) {
    return process.env.NODE_ENV === "development";
  }

  const source = origin ?? referer;
  if (!source) return false;

  try {
    const url = new URL(source);
    const normalized = `${url.protocol}//${url.host}`;
    return ALLOWED_ORIGINS.has(normalized);
  } catch {
    return false;
  }
}

export function validateApiKey(request: Request): boolean {
  const expected = process.env.CONTACT_API_SECRET;
  if (!expected) return true;

  const provided = request.headers.get("x-api-key") ?? "";
  if (provided.length !== expected.length) return false;

  try {
    return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function createSecureJsonResponse(
  body: unknown,
  init?: ResponseInit
): NextResponse {
  const response = NextResponse.json(body, init);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.delete("X-Powered-By");
  return response;
}
