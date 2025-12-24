import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { masses } from "./masses";

export const churchTypeEnum = pgEnum("church_type", ["parish", "community"]);

export const churches = pgTable("churches", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: churchTypeEnum("type"),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const churchesRelations = relations(churches, ({ many }) => ({
  masses: many(masses),
}));
