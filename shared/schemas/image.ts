import { z } from "zod";

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"] as const;

export const imageUploadSchema = z.object({
  file: z
    .file({ error: "Choose an image to upload." })
    .max(MAX_IMAGE_BYTES, { error: "Images must be 8 MB or smaller." })
    .mime([...IMAGE_MIME_TYPES], { error: "Use a JPEG, PNG, WebP, AVIF or GIF image." }),
});

export const imageDeleteSchema = z.object({
  publicId: z.string().trim().min(1).max(255),
});
