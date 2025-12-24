import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const memberRoleEnum = pgEnum("memberRole", [
  "admin",
  "member",
  "owner",
]);

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  organizationId: uuid("organization_id").notNull(),
  role: memberRoleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
