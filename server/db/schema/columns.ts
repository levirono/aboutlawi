import { boolean, integer, text, timestamp } from "drizzle-orm/pg-core";

/** Columns shared by every table that stores a Cloudinary image. */
export const imageColumns = {
  imageUrl: text("image_url"),
  imagePublicId: text("image_public_id"),
  imageAlt: text("image_alt"),
};

/** Columns shared by every admin-orderable, hideable collection. */
export const listingColumns = {
  visible: boolean("visible").notNull().default(true),
  position: integer("position").notNull().default(0),
};

export const timestampColumns = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
