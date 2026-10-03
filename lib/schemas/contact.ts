import { z } from "zod";

/**
 * Canonical contact form schema — single source of truth.
 * Shared between the Client (react-hook-form) and Server (next-safe-action).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email address is too long." })
    .toLowerCase(),
  subject: z
    .string()
    .min(4, { message: "Subject must be at least 4 characters." })
    .max(150, { message: "Subject must not exceed 150 characters." })
    .trim(),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters." })
    .max(2000, { message: "Message must not exceed 2000 characters." })
    .trim(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
