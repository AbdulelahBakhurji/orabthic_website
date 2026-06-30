import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n";
import { SECURITY_HEADERS } from "./lib/security/headers";
import { validateRequestSecurity } from "./lib/security/request";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

function attachSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.delete("X-Powered-By");
  return response;
}

export default function middleware(request: NextRequest) {
  const securityBlock = validateRequestSecurity(request);
  if (securityBlock) return securityBlock;

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return attachSecurityHeaders(NextResponse.next());
  }

  return attachSecurityHeaders(intlMiddleware(request));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
