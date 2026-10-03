import "server-only";
import { cache } from "react";
import { and, asc, desc, eq } from "drizzle-orm";
import { db, schema } from "@/server/db";

const { projects, skills, achievements, galleryItems, socialLinks } = schema;

type Insert<T extends { $inferInsert: unknown }> = Omit<T["$inferInsert"], "id" | "createdAt" | "updatedAt">;

export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;

/* ─── Projects ──────────────────────────────────────────────────────────── */

/** Public list fields only: the body is fetched on the detail page. */
const projectCard = {
  id: projects.id,
  slug: projects.slug,
  title: projects.title,
  summary: projects.summary,
  imageUrl: projects.imageUrl,
  imageAlt: projects.imageAlt,
  tags: projects.tags,
  repoUrl: projects.repoUrl,
  liveUrl: projects.liveUrl,
};
export type ProjectCard = Pick<Project, keyof typeof projectCard>;

export const listPublicProjects = cache(async (options: { featuredOnly?: boolean; limit?: number } = {}) => {
  const query = db()
    .select(projectCard)
    .from(projects)
    .where(and(eq(projects.visible, true), options.featuredOnly ? eq(projects.featured, true) : undefined))
    .orderBy(asc(projects.position), desc(projects.createdAt));
  return options.limit ? query.limit(options.limit) : query;
});

export const findPublicProjectBySlug = cache(async (slug: string) => {
  const [row] = await db()
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.visible, true)))
    .limit(1);
  return row ?? null;
});

export async function listProjects(): Promise<Project[]> {
  return db().select().from(projects).orderBy(asc(projects.position), desc(projects.createdAt));
}

export async function findProject(id: number): Promise<Project | null> {
  const [row] = await db().select().from(projects).where(eq(projects.id, id)).limit(1);
  return row ?? null;
}

export async function createProject(values: Insert<typeof projects>): Promise<Project> {
  const [row] = await db().insert(projects).values(values).returning();
  return row;
}

export async function updateProject(id: number, values: Insert<typeof projects>): Promise<Project | null> {
  const [row] = await db().update(projects).set(values).where(eq(projects.id, id)).returning();
  return row ?? null;
}

export async function deleteProject(id: number): Promise<Project | null> {
  const [row] = await db().delete(projects).where(eq(projects.id, id)).returning();
  return row ?? null;
}

/* ─── Skills ────────────────────────────────────────────────────────────── */

export const listPublicSkills = cache(async (options: { featuredOnly?: boolean; limit?: number } = {}) => {
  const query = db()
    .select({ id: skills.id, name: skills.name, category: skills.category, description: skills.description })
    .from(skills)
    .where(and(eq(skills.visible, true), options.featuredOnly ? eq(skills.featured, true) : undefined))
    .orderBy(asc(skills.position), asc(skills.name));
  return options.limit ? query.limit(options.limit) : query;
});

export async function listSkills(): Promise<Skill[]> {
  return db().select().from(skills).orderBy(asc(skills.position), asc(skills.name));
}

export async function findSkill(id: number): Promise<Skill | null> {
  const [row] = await db().select().from(skills).where(eq(skills.id, id)).limit(1);
  return row ?? null;
}

export async function createSkill(values: Insert<typeof skills>): Promise<Skill> {
  const [row] = await db().insert(skills).values(values).returning();
  return row;
}

export async function updateSkill(id: number, values: Insert<typeof skills>): Promise<Skill | null> {
  const [row] = await db().update(skills).set(values).where(eq(skills.id, id)).returning();
  return row ?? null;
}

export async function deleteSkill(id: number): Promise<Skill | null> {
  const [row] = await db().delete(skills).where(eq(skills.id, id)).returning();
  return row ?? null;
}

/* ─── Achievements ──────────────────────────────────────────────────────── */

export const listPublicAchievements = cache(async (options: { featuredOnly?: boolean; limit?: number } = {}) => {
  const query = db()
    .select({
      id: achievements.id,
      title: achievements.title,
      issuer: achievements.issuer,
      description: achievements.description,
      achievedOn: achievements.achievedOn,
      url: achievements.url,
      imageUrl: achievements.imageUrl,
      imageAlt: achievements.imageAlt,
    })
    .from(achievements)
    .where(and(eq(achievements.visible, true), options.featuredOnly ? eq(achievements.featured, true) : undefined))
    .orderBy(asc(achievements.position), desc(achievements.achievedOn));
  return options.limit ? query.limit(options.limit) : query;
});

export async function listAchievements(): Promise<Achievement[]> {
  return db().select().from(achievements).orderBy(asc(achievements.position), desc(achievements.achievedOn));
}

export async function findAchievement(id: number): Promise<Achievement | null> {
  const [row] = await db().select().from(achievements).where(eq(achievements.id, id)).limit(1);
  return row ?? null;
}

export async function createAchievement(values: Insert<typeof achievements>): Promise<Achievement> {
  const [row] = await db().insert(achievements).values(values).returning();
  return row;
}

export async function updateAchievement(id: number, values: Insert<typeof achievements>): Promise<Achievement | null> {
  const [row] = await db().update(achievements).set(values).where(eq(achievements.id, id)).returning();
  return row ?? null;
}

export async function deleteAchievement(id: number): Promise<Achievement | null> {
  const [row] = await db().delete(achievements).where(eq(achievements.id, id)).returning();
  return row ?? null;
}

/* ─── Gallery ───────────────────────────────────────────────────────────── */

export const listPublicGallery = cache(async (options: { featuredOnly?: boolean; limit?: number } = {}) => {
  const query = db()
    .select({
      id: galleryItems.id,
      title: galleryItems.title,
      caption: galleryItems.caption,
      imageUrl: galleryItems.imageUrl,
      imageAlt: galleryItems.imageAlt,
    })
    .from(galleryItems)
    .where(and(eq(galleryItems.visible, true), options.featuredOnly ? eq(galleryItems.featured, true) : undefined))
    .orderBy(asc(galleryItems.position), desc(galleryItems.createdAt));
  return options.limit ? query.limit(options.limit) : query;
});

export async function listGallery(): Promise<GalleryItem[]> {
  return db().select().from(galleryItems).orderBy(asc(galleryItems.position), desc(galleryItems.createdAt));
}

export async function findGalleryItem(id: number): Promise<GalleryItem | null> {
  const [row] = await db().select().from(galleryItems).where(eq(galleryItems.id, id)).limit(1);
  return row ?? null;
}

export async function createGalleryItem(values: Insert<typeof galleryItems>): Promise<GalleryItem> {
  const [row] = await db().insert(galleryItems).values(values).returning();
  return row;
}

export async function updateGalleryItem(id: number, values: Insert<typeof galleryItems>): Promise<GalleryItem | null> {
  const [row] = await db().update(galleryItems).set(values).where(eq(galleryItems.id, id)).returning();
  return row ?? null;
}

export async function deleteGalleryItem(id: number): Promise<GalleryItem | null> {
  const [row] = await db().delete(galleryItems).where(eq(galleryItems.id, id)).returning();
  return row ?? null;
}

/* ─── Social links ──────────────────────────────────────────────────────── */

export const listPublicSocialLinks = cache(async () => {
  return db()
    .select({ id: socialLinks.id, label: socialLinks.label, url: socialLinks.url, icon: socialLinks.icon, showInHeader: socialLinks.showInHeader })
    .from(socialLinks)
    .where(eq(socialLinks.visible, true))
    .orderBy(asc(socialLinks.position), asc(socialLinks.id));
});
export type PublicSocialLink = Awaited<ReturnType<typeof listPublicSocialLinks>>[number];

export async function listSocialLinks(): Promise<SocialLink[]> {
  return db().select().from(socialLinks).orderBy(asc(socialLinks.position), asc(socialLinks.id));
}

export async function findSocialLink(id: number): Promise<SocialLink | null> {
  const [row] = await db().select().from(socialLinks).where(eq(socialLinks.id, id)).limit(1);
  return row ?? null;
}

export async function createSocialLink(values: Insert<typeof socialLinks>): Promise<SocialLink> {
  const [row] = await db().insert(socialLinks).values(values).returning();
  return row;
}

export async function updateSocialLink(id: number, values: Insert<typeof socialLinks>): Promise<SocialLink | null> {
  const [row] = await db().update(socialLinks).set(values).where(eq(socialLinks.id, id)).returning();
  return row ?? null;
}

export async function deleteSocialLink(id: number): Promise<SocialLink | null> {
  const [row] = await db().delete(socialLinks).where(eq(socialLinks.id, id)).returning();
  return row ?? null;
}
