import { z } from "zod";

/** Contact form contract, shared by the client form and the server action. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(100, { error: "Name must be at most 100 characters." }),
  email: z.email({ error: "Enter a valid email address." }).trim().toLowerCase().max(254),
  message: z
    .string()
    .trim()
    .min(10, { error: "Message must be at least 10 characters." })
    .max(2000, { error: "Message must be at most 2000 characters." }),
});

export type ContactInput = z.input<typeof contactSchema>;
