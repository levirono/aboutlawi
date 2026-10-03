import "server-only";
import { parseEnv, serverEnvSchema, type ServerEnv } from "@/server/env.schema";

let cached: ServerEnv | undefined;

/**
 * Validated server environment. Parsed once; `instrumentation.ts` calls this at
 * server start so a missing variable fails fast with a clear message.
 */
export function env(): ServerEnv {
  cached ??= parseEnv(serverEnvSchema, process.env);
  return cached;
}
