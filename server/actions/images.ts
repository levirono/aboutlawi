"use server";

import { deleteImage, uploadImage } from "@/server/utils/cloudinary";
import { adminAction } from "@/server/utils/safe-action";
import { imageDeleteSchema, imageUploadSchema } from "@/shared/schemas/image";

/** Signed upload through the server. Only the returned URL and public id are stored by forms. */
export const uploadImageAction = adminAction
  .metadata({ actionName: "images.upload" })
  .inputSchema(imageUploadSchema)
  .action(async ({ parsedInput }) => uploadImage(parsedInput.file));

/** Discards an upload that was replaced before its form was saved, so no orphan assets remain. */
export const discardImageAction = adminAction
  .metadata({ actionName: "images.discard" })
  .inputSchema(imageDeleteSchema)
  .action(async ({ parsedInput }) => {
    await deleteImage(parsedInput.publicId);
    return { deleted: true };
  });
