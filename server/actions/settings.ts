"use server";

import { getSiteSettings, upsertPageMeta, upsertSiteSettings } from "@/server/db/queries/site";
import { deleteReplacedImage } from "@/server/utils/cloudinary";
import { revalidateSite } from "@/server/utils/crud";
import { adminAction } from "@/server/utils/safe-action";
import { pageMetaSchema, siteSettingsSchema } from "@/shared/schemas/content";

export const saveSiteSettingsAction = adminAction
  .metadata({ actionName: "settings.save" })
  .inputSchema(siteSettingsSchema)
  .action(async ({ parsedInput: { imageUrl, imagePublicId, ...values } }) => {
    const previous = await getSiteSettings();
    await upsertSiteSettings({ ...values, ogImageUrl: imageUrl, ogImagePublicId: imagePublicId });
    await deleteReplacedImage(previous?.ogImagePublicId ?? null, imagePublicId);
    revalidateSite();
    return { saved: true };
  });

export const savePageMetaAction = adminAction
  .metadata({ actionName: "pageMeta.save" })
  .inputSchema(pageMetaSchema)
  .action(async ({ parsedInput }) => {
    await upsertPageMeta(parsedInput);
    revalidateSite();
    return { page: parsedInput.page };
  });
