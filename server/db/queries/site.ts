import "server-only";
import { cache } from "react";
import { and, asc, eq } from "drizzle-orm";
import { db, schema } from "@/server/db";
import type { Page } from "@/shared/constants";

const { siteSettings, pageMeta, pageSections } = schema;

const SETTINGS_ID = 1;

export type SiteSettings = typeof siteSettings.$inferSelect;
export type PageMeta = typeof pageMeta.$inferSelect;
export type PageSection = typeof pageSections.$inferSelect;
export type PageSectionInput = Omit<typeof pageSections.$inferInsert, "id" | "createdAt" | "updatedAt">;

/* ─── Settings ──────────────────────────────────────────────────────────── */

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  const [row] = await db().select().from(siteSettings).where(eq(siteSettings.id, SETTINGS_ID)).limit(1);
  return row ?? null;
});

export async function upsertSiteSettings(values: Omit<typeof siteSettings.$inferInsert, "id">): Promise<void> {
  await db()
    .insert(siteSettings)
    .values({ ...values, id: SETTINGS_ID })
    .onConflictDoUpdate({ target: siteSettings.id, set: values });
}

/* ─── Page meta ─────────────────────────────────────────────────────────── */

export async function listPageMeta(): Promise<PageMeta[]> {
  return db().select().from(pageMeta);
}

export const getPageMeta = cache(async (page: Page): Promise<PageMeta | null> => {
  const [row] = await db().select().from(pageMeta).where(eq(pageMeta.page, page)).limit(1);
  return row ?? null;
});

export async function upsertPageMeta(values: { page: Page; title: string | null; description: string | null }) {
  await db()
    .insert(pageMeta)
    .values(values)
    .onConflictDoUpdate({ target: pageMeta.page, set: { title: values.title, description: values.description } });
}

/* ─── Page sections ─────────────────────────────────────────────────────── */

/** Visible sections of one public page, in admin-defined order. */
export const listVisibleSections = cache(async (page: Page): Promise<PageSection[]> => {
  return db()
    .select()
    .from(pageSections)
    .where(and(eq(pageSections.page, page), eq(pageSections.visible, true)))
    .orderBy(asc(pageSections.position), asc(pageSections.id));
});

export async function listSections(page?: Page): Promise<PageSection[]> {
  return db()
    .select()
    .from(pageSections)
    .where(page ? eq(pageSections.page, page) : undefined)
    .orderBy(asc(pageSections.page), asc(pageSections.position), asc(pageSections.id));
}

export async function findSection(id: number): Promise<PageSection | null> {
  const [row] = await db().select().from(pageSections).where(eq(pageSections.id, id)).limit(1);
  return row ?? null;
}

export async function createSection(values: PageSectionInput): Promise<PageSection> {
  const [row] = await db().insert(pageSections).values(values).returning();
  return row;
}

export async function updateSection(id: number, values: PageSectionInput): Promise<PageSection | null> {
  const [row] = await db().update(pageSections).set(values).where(eq(pageSections.id, id)).returning();
  return row ?? null;
}

export async function deleteSection(id: number): Promise<PageSection | null> {
  const [row] = await db().delete(pageSections).where(eq(pageSections.id, id)).returning();
  return row ?? null;
}
