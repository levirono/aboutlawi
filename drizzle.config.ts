import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { databaseEnvSchema, parseEnv } from "./server/env.schema";

const { DATABASE_URL } = parseEnv(databaseEnvSchema, process.env);

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/schema/index.ts",
  out: "./server/db/migrations",
  dbCredentials: { url: DATABASE_URL },
  strict: true,
  verbose: true,
});
