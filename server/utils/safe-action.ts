import "server-only";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { requireAdmin } from "@/server/utils/auth";
import { toAppError, type ApiError } from "@/server/utils/errors";
import { logger } from "@/server/utils/logger";

/**
 * The single wrapper every Server Action goes through (the `defineApiHandler`
 * of this app). It validates input with the action's shared Zod schema, maps any
 * thrown error to a typed `ApiError`, and logs the outcome. Actions contain no
 * try/catch of their own.
 */
export const publicAction = createSafeActionClient({
  defineMetadataSchema: () => z.object({ actionName: z.string() }),
  defaultValidationErrorsShape: "flattened",
  handleServerError(error, { metadata }): ApiError {
    const appError = toAppError(error);
    const context = { action: metadata?.actionName, status: appError.status, code: appError.code };
    if (appError.status >= 500) logger.error("action failed", { ...context, error });
    else logger.warn("action rejected", context);
    return appError.toApiError();
  },
}).use(async ({ next, metadata }) => {
  const startedAt = Date.now();
  const result = await next();
  if (result.success) {
    logger.info("action ok", { action: metadata.actionName, status: 200, durationMs: Date.now() - startedAt });
  }
  return result;
});

/** Every admin action verifies the session on the server, never trusting the client guard. */
export const adminAction = publicAction.use(async ({ next }) => {
  const admin = await requireAdmin();
  return next({ ctx: { admin } });
});
