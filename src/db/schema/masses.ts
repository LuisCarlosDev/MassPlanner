import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { churches } from "./churches";
import { relations } from "drizzle-orm";

export const masses = pgTable("masses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  celebrant: text("celebrant").notNull(),
  date: timestamp("date").notNull(),
  churchId: uuid("church_id").references(() => churches.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const massesRelations = relations(masses, ({ one }) => ({
  church: one(churches, {
    fields: [masses.churchId],
    references: [churches.id],
  }),
}));
