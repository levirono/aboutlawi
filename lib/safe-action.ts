import { createSafeActionClient } from "next-safe-action";

/**
 * Application-wide safe action client.
 * Configured with a standardised server error handler that prevents
 * internal error messages from leaking to the client.
 */
export const actionClient = createSafeActionClient({
  handleServerError(error: unknown): string {
    // Log internally; never expose raw error messages to the client.
    console.error("[server-action-error]", error);

    if (error instanceof Error) {
      // Only surface errors that were deliberately thrown with a clean message.
      // Opaque errors (DB failures, etc.) get a generic message.
      if (
        error.message &&
        !error.message.toLowerCase().includes("internal") &&
        !error.message.toLowerCase().includes("database")
      ) {
        return error.message;
      }
    }

    return "An unexpected error occurred. Please try again.";
  },
});
