"use server";

import { z } from "zod";
import { listingTables, reorder, setVisibility } from "@/server/db/queries/listing";
import { revalidateSite } from "@/server/utils/crud";
import { NotFoundError } from "@/server/utils/errors";
import { adminAction } from "@/server/utils/safe-action";
import { reorderSchema, toggleVisibilitySchema } from "@/shared/schemas/common";

const resource = z.enum(Object.keys(listingTables) as [keyof typeof listingTables, ...(keyof typeof listingTables)[]]);

export const setVisibilityAction = adminAction
  .metadata({ actionName: "listing.setVisibility" })
  .inputSchema(toggleVisibilitySchema.extend({ resource }))
  .action(async ({ parsedInput }) => {
    const found = await setVisibility(parsedInput.resource, parsedInput.id, parsedInput.visible);
    if (!found) throw new NotFoundError();
    revalidateSite();
    return { visible: parsedInput.visible };
  });

export const reorderAction = adminAction
  .metadata({ actionName: "listing.reorder" })
  .inputSchema(reorderSchema.extend({ resource }))
  .action(async ({ parsedInput }) => {
    await reorder(parsedInput.resource, parsedInput.ids);
    revalidateSite();
    return { count: parsedInput.ids.length };
  });
