import { z } from "zod";

/**
 * Environment contract. Kept free of `server-only` so that CLI scripts
 * (seed, drizzle-kit) can validate the same variables outside Next.js.
 */
export const durationSchema = z
  .string()
  .regex(/^\d+[smhd]$/, { error: "Use a duration such as 30m, 2h or 7d." });

export const databaseEnvSchema = z.object({
  DATABASE_URL: z.url({ error: "DATABASE_URL must be a Postgres connection URL." }),
});

export const seedEnvSchema = databaseEnvSchema.extend({
  SEED_ADMIN_EMAIL: z.email(),
  SEED_ADMIN_PASSWORD: z.string().min(8, { error: "SEED_ADMIN_PASSWORD must be at least 8 characters." }),
});

export const serverEnvSchema = databaseEnvSchema.extend({
  JWT_SECRET: z.string().min(32, { error: "JWT_SECRET must be at least 32 characters." }),
  JWT_EXPIRES_IN: durationSchema.default("2h"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  LOG_DIR: z.string().min(1).default("logs"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Parses `source` against `schema`, throwing one readable message listing every problem. */
export function parseEnv<T extends z.ZodType>(schema: T, source: NodeJS.ProcessEnv): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables (see .env.example):\n${problems}`);
  }
  return result.data;
}

/** Converts a duration such as "2h" into seconds. */
export function durationToSeconds(duration: string): number {
  const amount = Number.parseInt(duration, 10);
  const unit = duration.at(-1);
  const factor = unit === "d" ? 86_400 : unit === "h" ? 3_600 : unit === "m" ? 60 : 1;
  return amount * factor;
}
