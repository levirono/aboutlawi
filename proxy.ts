import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/server/utils/session-token";

/**
 * Optimistic admin guard: redirects requests without a valid session token.
 * The authoritative check (token + admin still exists) runs again inside every
 * admin layout and Server Action.
 */
export async function proxy(request: NextRequest) {
  const secret = process.env.JWT_SECRET ?? "";
  const session = secret
    ? await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value, secret)
    : null;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
