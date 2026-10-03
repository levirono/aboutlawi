import "server-only";
import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/server/db";

const { contactMessages } = schema;

export type ContactMessage = typeof contactMessages.$inferSelect;

export async function createMessage(values: { name: string; email: string; message: string }): Promise<void> {
  await db().insert(contactMessages).values(values);
}

export async function listMessages(): Promise<ContactMessage[]> {
  return db().select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function setMessageRead(id: number, read: boolean): Promise<boolean> {
  const rows = await db()
    .update(contactMessages)
    .set({ readAt: read ? new Date() : null })
    .where(eq(contactMessages.id, id))
    .returning({ id: contactMessages.id });
  return rows.length > 0;
}

export async function deleteMessage(id: number): Promise<boolean> {
  const rows = await db().delete(contactMessages).where(eq(contactMessages.id, id)).returning({ id: contactMessages.id });
  return rows.length > 0;
}
