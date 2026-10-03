import { integer, pgEnum, pgTable, text, unique } from "drizzle-orm/pg-core";
import { PAGES, SECTION_TYPES } from "../../../shared/constants";
import { imageColumns, listingColumns, timestampColumns } from "./columns";

export const pageEnum = pgEnum("page", PAGES);
export const sectionTypeEnum = pgEnum("section_type", SECTION_TYPES);

/** Singleton row (id = 1): global identity and default SEO. */
export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  siteName: text("site_name").notNull(),
  ownerName: text("owner_name"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  ogImageUrl: text("og_image_url"),
  ogImagePublicId: text("og_image_public_id"),
  ...timestampColumns,
});

/** Per-page SEO overrides. Support table: one row per public page. */
export const pageMeta = pgTable("page_meta", {
  page: pageEnum("page").primaryKey(),
  title: text("title"),
  description: text("description"),
  ...timestampColumns,
});

/**
 * Every admin-managed block on every public page: hero, headings, intros,
 * about text, previews, CTAs and empty-state copy. Visibility and order are per row.
 */
export const pageSections = pgTable(
  "page_sections",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    page: pageEnum("page").notNull(),
    key: text("key").notNull(),
    type: sectionTypeEnum("type").notNull(),
    title: text("title"),
    subtitle: text("subtitle"),
    body: text("body"),
    ...imageColumns,
    ctaLabel: text("cta_label"),
    ctaHref: text("cta_href"),
    secondaryCtaLabel: text("secondary_cta_label"),
    secondaryCtaHref: text("secondary_cta_href"),
    itemLimit: integer("item_limit"),
    ...listingColumns,
    ...timestampColumns,
  },
  (table) => [unique("page_sections_page_key_unique").on(table.page, table.key)],
);
