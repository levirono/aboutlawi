"use server";

import { actionClient } from "@/lib/safe-action";
import { contactSchema } from "@/lib/schemas/contact";

/**
 * Server Action: submitContactForm
 *
 * Wrapped with next-safe-action for:
 *  - Zod schema validation before code runs
 *  - Standardised server error handling
 *  - Type-safe result shape on the client
 *
 * In production this would integrate with an email delivery service
 * (Resend, SendGrid, etc.). Currently logs the validated payload.
 */
export const submitContactForm = actionClient
  .schema(contactSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, subject, message } = parsedInput;

    // Production: await sendEmail({ to: "john@example.com", from: email, ... })
    // Simulated async work:
    await new Promise<void>((resolve) => setTimeout(resolve, 600));

    console.info("[contact-form] submission received", {
      name,
      email,
      subject,
      messageLength: message.length,
    });

    return {
      success: true,
      message: `Thank you, ${name}. Your message has been received and I'll respond to ${email} shortly.`,
    };
  });
