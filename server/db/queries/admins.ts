import "server-only";
import { eq } from "drizzle-orm";
import { db, schema } from "@/server/db";

const { admins } = schema;

export async function findAdminById(id: number) {
  const [admin] = await db()
    .select({ id: admins.id, email: admins.email })
    .from(admins)
    .where(eq(admins.id, id))
    .limit(1);
  return admin ?? null;
}

/** Includes the password hash: only for the login action. */
export async function findAdminCredentialsByEmail(email: string) {
  const [admin] = await db()
    .select({ id: admins.id, email: admins.email, passwordHash: admins.passwordHash })
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);
  return admin ?? null;
}

export async function recordAdminLogin(id: number): Promise<void> {
  await db().update(admins).set({ lastLoginAt: new Date() }).where(eq(admins.id, id));
}
