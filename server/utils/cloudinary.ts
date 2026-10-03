import "server-only";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { env } from "@/server/env";
import { InternalError } from "@/server/utils/errors";

const UPLOAD_FOLDER = "portfolio";

let configured = false;

function client(): typeof cloudinary {
  if (!configured) {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = env();
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }
  return cloudinary;
}

export type StoredImage = { url: string; publicId: string };

/** Signed, server-side upload. The API secret never leaves the server. */
export async function uploadImage(file: File): Promise<StoredImage> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = client().uploader.upload_stream(
      { folder: UPLOAD_FOLDER, resource_type: "image", overwrite: false, unique_filename: true },
      (error, response) => {
        if (error || !response) reject(error ?? new InternalError("Image upload failed."));
        else resolve(response);
      },
    );
    stream.end(buffer);
  });
  return { url: result.secure_url, publicId: result.public_id };
}

/** Removes an asset from Cloudinary. Only assets inside the app's folder can be deleted. */
export async function deleteImage(publicId: string): Promise<void> {
  if (!publicId.startsWith(`${UPLOAD_FOLDER}/`)) return;
  await client().uploader.destroy(publicId, { resource_type: "image", invalidate: true });
}

/** Deletes `previous` when it has been replaced or cleared. */
export async function deleteReplacedImage(previous: string | null, next: string | null): Promise<void> {
  if (previous && previous !== next) await deleteImage(previous);
}
