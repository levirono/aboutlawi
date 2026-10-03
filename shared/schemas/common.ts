import { z } from "zod";

/** Optional free text: trimmed, and an empty string becomes `null` so the block is hidden. */
export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Must be at most ${max} characters.` })
    .transform((value) => (value === "" ? null : value));

export const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, { error: `${label} is required.` })
    .max(max, { error: `${label} must be at most ${max} characters.` });

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

/** Absolute http(s) URL, or empty → null. */
export const optionalUrl = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => value === "" || isHttpUrl(value), { error: "Enter a full URL starting with https://." })
  .transform((value) => (value === "" ? null : value));

/** Link target for CTAs: an internal path ("/projects", "#contact") or an absolute URL. Empty → null. */
export const optionalHref = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => value === "" || /^[/#]/.test(value) || isHttpUrl(value) || value.startsWith("mailto:"), {
    error: "Use a path like /projects or a full URL.",
  })
  .transform((value) => (value === "" ? null : value));

export const idSchema = z.object({ id: z.coerce.number().int().positive() });

export const slugSchema = z
  .string()
  .trim()
  .min(1, { error: "Slug is required." })
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { error: "Use lowercase letters, numbers and hyphens only." });

/** Image fields stored on a row. URL and public id must be set together. */
export const optionalImageFields = {
  imageUrl: optionalUrl,
  imagePublicId: optionalText(255),
  imageAlt: optionalText(200),
};

export const listingFields = {
  visible: z.boolean(),
};

export const toggleVisibilitySchema = z.object({
  id: z.number().int().positive(),
  visible: z.boolean(),
});

export const reorderSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1).max(500),
});

/** Ensures an image URL is never stored without its Cloudinary public id (and vice versa). */
export function imagePairIsComplete(value: { imageUrl: string | null; imagePublicId: string | null }): boolean {
  return (value.imageUrl === null) === (value.imagePublicId === null);
}

export const imagePairIssue = { error: "Upload the image again.", path: ["imageUrl"] };
