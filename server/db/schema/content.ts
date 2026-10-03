import { boolean, date, integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { SOCIAL_ICONS } from "../../../shared/constants";
import { imageColumns, listingColumns, timestampColumns } from "./columns";

export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  body: text("body"),
  ...imageColumns,
  repoUrl: text("repo_url"),
  liveUrl: text("live_url"),
  tags: text("tags").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  ...listingColumns,
  ...timestampColumns,
});

export const skills = pgTable("skills", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  featured: boolean("featured").notNull().default(false),
  ...listingColumns,
  ...timestampColumns,
});

export const achievements = pgTable("achievements", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  issuer: text("issuer"),
  description: text("description"),
  achievedOn: date("achieved_on", { mode: "string" }),
  url: text("url"),
  ...imageColumns,
  featured: boolean("featured").notNull().default(false),
  ...listingColumns,
  ...timestampColumns,
});

export const galleryItems = pgTable("gallery_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title"),
  caption: text("caption"),
  imageUrl: text("image_url").notNull(),
  imagePublicId: text("image_public_id").notNull(),
  imageAlt: text("image_alt").notNull(),
  featured: boolean("featured").notNull().default(false),
  ...listingColumns,
  ...timestampColumns,
});

export const socialIconEnum = pgEnum("social_icon", SOCIAL_ICONS);

export const socialLinks = pgTable("social_links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  icon: socialIconEnum("icon").notNull().default("other"),
  showInHeader: boolean("show_in_header").notNull().default(false),
  ...listingColumns,
  ...timestampColumns,
});
