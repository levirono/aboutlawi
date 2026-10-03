import "server-only";
import { count, desc, eq, isNull } from "drizzle-orm";
import { db, schema } from "@/server/db";

const { projects, skills, achievements, galleryItems, socialLinks, pageSections, contactMessages } = schema;

/** Every number on the dashboard, computed in one batched round trip. */
export async function getDashboardSummary() {
  const [
    [projectCount],
    [skillCount],
    [achievementCount],
    [galleryCount],
    [socialCount],
    [hiddenSectionCount],
    [messageCount],
    [unreadCount],
    recentMessages,
  ] = await db().batch([
    db().select({ value: count() }).from(projects),
    db().select({ value: count() }).from(skills),
    db().select({ value: count() }).from(achievements),
    db().select({ value: count() }).from(galleryItems),
    db().select({ value: count() }).from(socialLinks),
    db().select({ value: count() }).from(pageSections).where(eq(pageSections.visible, false)),
    db().select({ value: count() }).from(contactMessages),
    db().select({ value: count() }).from(contactMessages).where(isNull(contactMessages.readAt)),
    db()
      .select({ id: contactMessages.id, name: contactMessages.name, createdAt: contactMessages.createdAt, readAt: contactMessages.readAt })
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(5),
  ]);

  return {
    counts: {
      projects: projectCount.value,
      skills: skillCount.value,
      achievements: achievementCount.value,
      gallery: galleryCount.value,
      socialLinks: socialCount.value,
      hiddenSections: hiddenSectionCount.value,
      messages: messageCount.value,
      unreadMessages: unreadCount.value,
    },
    recentMessages,
  };
}
