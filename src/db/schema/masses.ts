import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const masses = pgTable("masses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  celebrant: text("celebrant").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
