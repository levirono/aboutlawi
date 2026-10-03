"use server";

import { z } from "zod";
import { createMessage, deleteMessage, setMessageRead } from "@/server/db/queries/messages";
import { revalidateSite } from "@/server/utils/crud";
import { NotFoundError } from "@/server/utils/errors";
import { assertRateLimit, clientIp, RATE_LIMITS } from "@/server/utils/rate-limit";
import { adminAction, publicAction } from "@/server/utils/safe-action";
import { contactSchema } from "@/shared/schemas/contact";

export const sendMessageAction = publicAction
  .metadata({ actionName: "contact.send" })
  .inputSchema(contactSchema)
  .action(async ({ parsedInput }) => {
    assertRateLimit(RATE_LIMITS.contact, await clientIp());
    await createMessage(parsedInput);
    return { sent: true };
  });

export const setMessageReadAction = adminAction
  .metadata({ actionName: "messages.setRead" })
  .inputSchema(z.object({ id: z.number().int().positive(), read: z.boolean() }))
  .action(async ({ parsedInput }) => {
    if (!(await setMessageRead(parsedInput.id, parsedInput.read))) throw new NotFoundError("Message");
    revalidateSite();
    return { read: parsedInput.read };
  });

export const deleteMessageAction = adminAction
  .metadata({ actionName: "messages.delete" })
  .inputSchema(z.object({ id: z.number().int().positive() }))
  .action(async ({ parsedInput }) => {
    if (!(await deleteMessage(parsedInput.id))) throw new NotFoundError("Message");
    revalidateSite();
    return { id: parsedInput.id };
  });
