import { z } from "zod";
import { PAGES, SECTION_TYPES, SOCIAL_ICONS } from "@/shared/constants";
import {
  imagePairIsComplete,
  imagePairIssue,
  listingFields,
  optionalHref,
  optionalImageFields,
  optionalText,
  optionalUrl,
  requiredText,
  slugSchema,
} from "@/shared/schemas/common";

const id = { id: z.number().int().positive() };

type ImagePair = { imageUrl: string | null; imagePublicId: string | null };

/** Builds the create and update schemas for a resource from one field shape. */
function resourceSchemas<Shape extends z.ZodRawShape>(shape: Shape, hasImage: boolean) {
  const base = z.object(shape);
  const withId = base.extend(id);
  if (!hasImage) return { create: base, update: withId };
  return {
    create: base.refine((value) => imagePairIsComplete(value as unknown as ImagePair), imagePairIssue),
    update: withId.refine((value) => imagePairIsComplete(value as unknown as ImagePair), imagePairIssue),
  };
}

/* ─── Site settings & page meta ─────────────────────────────────────────── */

export const siteSettingsSchema = z
  .object({
    siteName: requiredText("Site name", 80),
    ownerName: optionalText(120),
    seoTitle: optionalText(120),
    seoDescription: optionalText(300),
    imageUrl: optionalUrl,
    imagePublicId: optionalText(255),
  })
  .refine(imagePairIsComplete, imagePairIssue);

export const pageMetaSchema = z.object({
  page: z.enum(PAGES),
  title: optionalText(120),
  description: optionalText(300),
});

/* ─── Page sections ─────────────────────────────────────────────────────── */

const sectionShape = {
  page: z.enum(PAGES),
  key: slugSchema,
  type: z.enum(SECTION_TYPES),
  title: optionalText(200),
  subtitle: optionalText(400),
  body: optionalText(10_000),
  ...optionalImageFields,
  ctaLabel: optionalText(60),
  ctaHref: optionalHref,
  secondaryCtaLabel: optionalText(60),
  secondaryCtaHref: optionalHref,
  itemLimit: z.number().int().min(1).max(48).nullable(),
  ...listingFields,
};
export const { create: sectionCreateSchema, update: sectionUpdateSchema } = resourceSchemas(sectionShape, true);

/* ─── Projects ──────────────────────────────────────────────────────────── */

const tagsField = z
  .string()
  .max(500)
  .transform((value) =>
    Array.from(new Set(value.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0))).slice(0, 20),
  );

const projectShape = {
  slug: slugSchema,
  title: requiredText("Title", 150),
  summary: requiredText("Summary", 400),
  body: optionalText(20_000),
  ...optionalImageFields,
  repoUrl: optionalUrl,
  liveUrl: optionalUrl,
  tags: tagsField,
  featured: z.boolean(),
  ...listingFields,
};
export const { create: projectCreateSchema, update: projectUpdateSchema } = resourceSchemas(projectShape, true);

/* ─── Skills ────────────────────────────────────────────────────────────── */

const skillShape = {
  name: requiredText("Name", 80),
  category: requiredText("Category", 60),
  description: optionalText(400),
  featured: z.boolean(),
  ...listingFields,
};
export const { create: skillCreateSchema, update: skillUpdateSchema } = resourceSchemas(skillShape, false);

/* ─── Achievements ──────────────────────────────────────────────────────── */

const achievementShape = {
  title: requiredText("Title", 150),
  issuer: optionalText(120),
  description: optionalText(1_000),
  achievedOn: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), { error: "Use the format YYYY-MM-DD." })
    .transform((value) => (value === "" ? null : value)),
  url: optionalUrl,
  ...optionalImageFields,
  featured: z.boolean(),
  ...listingFields,
};
export const { create: achievementCreateSchema, update: achievementUpdateSchema } = resourceSchemas(
  achievementShape,
  true,
);

/* ─── Gallery ───────────────────────────────────────────────────────────── */

const galleryShape = {
  title: optionalText(150),
  caption: optionalText(400),
  imageUrl: z.url({ error: "Upload an image." }),
  imagePublicId: requiredText("Image", 255),
  imageAlt: requiredText("Alt text", 200),
  featured: z.boolean(),
  ...listingFields,
};
export const { create: galleryCreateSchema, update: galleryUpdateSchema } = resourceSchemas(galleryShape, false);

/* ─── Social links ──────────────────────────────────────────────────────── */

const socialLinkShape = {
  label: requiredText("Label", 60),
  url: z
    .string()
    .trim()
    .refine((value) => /^https:\/\/\S+$/.test(value) || /^mailto:\S+@\S+$/.test(value), {
      error: "Use an https:// link (e.g. https://wa.me/254700000000) or mailto:.",
    }),
  icon: z.enum(SOCIAL_ICONS),
  showInHeader: z.boolean(),
  ...listingFields,
};
export const { create: socialLinkCreateSchema, update: socialLinkUpdateSchema } = resourceSchemas(
  socialLinkShape,
  false,
);
