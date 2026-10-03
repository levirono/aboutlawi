import type { Instrumentation } from "next";

/** Runs once when the server starts: fail fast if any environment variable is missing. */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { env } = await import("@/server/env");
    env();
  }
}

/** Logs every uncaught server error (render, route or action) to error.log. */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { logger } = await import("@/server/utils/logger");
  const digest = typeof error === "object" && error !== null && "digest" in error ? String(error.digest) : undefined;
  logger.error("uncaught request error", {
    route: context.routePath,
    routeType: context.routeType,
    method: request.method,
    path: request.path,
    status: 500,
    digest,
    error,
  });
};
