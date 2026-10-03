import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { timestampColumns } from "./columns";

export const admins = pgTable("admins", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  ...timestampColumns,
});
