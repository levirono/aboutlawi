import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/server/env";
import { durationToSeconds } from "@/server/env.schema";
import { findAdminById } from "@/server/db/queries/admins";
import { UnauthorizedError } from "@/server/utils/errors";
import {
  SESSION_COOKIE,
  signSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "@/server/utils/session-token";

export type AdminSession = SessionPayload;

export async function createSession(payload: SessionPayload): Promise<void> {
  const { JWT_SECRET, JWT_EXPIRES_IN } = env();
  const token = await signSessionToken(payload, JWT_SECRET, JWT_EXPIRES_IN);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: durationToSeconds(JWT_EXPIRES_IN),
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Authoritative session check: verifies the JWT and that the admin still exists.
 * Cached per request so layouts, pages and actions share one lookup.
 */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  const cookieStore = await cookies();
  const payload = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value, env().JWT_SECRET);
  if (!payload) return null;
  const admin = await findAdminById(payload.adminId);
  return admin ? { adminId: admin.id, email: admin.email } : null;
});

/** For Server Actions: throws UnauthorizedError without a valid session. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new UnauthorizedError();
  return session;
}

/** For admin pages and layouts: redirects to the login page without a valid session. */
export async function requireAdminPage(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
