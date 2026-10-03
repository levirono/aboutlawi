import "server-only";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/server/db";

/** Tables that share the `visible` + `position` listing columns. */
export const listingTables = {
  projects: schema.projects,
  skills: schema.skills,
  achievements: schema.achievements,
  galleryItems: schema.galleryItems,
  socialLinks: schema.socialLinks,
  pageSections: schema.pageSections,
} as const;

export type ListingResource = keyof typeof listingTables;

// The tables differ in their other columns; these helpers only touch the shared ones.
type SharedListingTable = typeof schema.skills;
const tableOf = (resource: ListingResource) => listingTables[resource] as unknown as SharedListingTable;

export async function setVisibility(resource: ListingResource, id: number, visible: boolean): Promise<boolean> {
  const table = tableOf(resource);
  const rows = await db().update(table).set({ visible }).where(eq(table.id, id)).returning({ id: table.id });
  return rows.length > 0;
}

/** Persists a new order: the row at index i gets position i. Runs as one batched round trip. */
export async function reorder(resource: ListingResource, ids: number[]): Promise<void> {
  const table = tableOf(resource);
  const [first, ...rest] = ids.map((id, position) => db().update(table).set({ position }).where(eq(table.id, id)));
  if (first) await db().batch([first, ...rest]);
}

/** Next free position, so new rows are appended to the end of the list. */
export async function nextPosition(resource: ListingResource): Promise<number> {
  const table = tableOf(resource);
  const rows = await db().select({ position: table.position }).from(table).orderBy(asc(table.position));
  return rows.length === 0 ? 0 : Math.max(...rows.map((row) => row.position)) + 1;
}
