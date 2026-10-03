import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/server/env";
import * as schema from "@/server/db/schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

let instance: Database | undefined;

/** Lazily created Drizzle client over the Neon serverless HTTP driver. */
export function db(): Database {
  instance ??= drizzle({ client: neon(env().DATABASE_URL), schema });
  return instance;
}

export { schema };
