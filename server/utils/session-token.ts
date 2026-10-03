import { jwtVerify, SignJWT } from "jose";

/**
 * JWT primitives with no Next.js or `server-only` imports, so both the Proxy
 * (optimistic check) and server code (authoritative check) can use them.
 */
export const SESSION_COOKIE = "admin_session";
const ISSUER = "portfolio-admin";
const AUDIENCE = "portfolio-admin";

export type SessionPayload = { adminId: number; email: string };

const encoder = new TextEncoder();

export function signSessionToken(payload: SessionPayload, secret: string, expiresIn: string): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.adminId))
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encoder.encode(secret));
}

/** Returns the payload of a valid, unexpired token, or `null`. */
export async function verifySessionToken(token: string | undefined, secret: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret), {
      algorithms: ["HS256"],
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const adminId = Number(payload.sub);
    if (!Number.isInteger(adminId) || typeof payload.email !== "string") return null;
    return { adminId, email: payload.email };
  } catch {
    return null;
  }
}
