import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const invitationRoleEnum = pgEnum("invitationRole", ["admin", "member"]);
export const invitationStatusEnum = pgEnum("invitationStatus", [
  "pending",
  "accepted",
  "rejected",
]);

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  inviterId: uuid("inviter_id").notNull(),
  organizationId: uuid("organization_id").notNull(),
  role: invitationRoleEnum("role").notNull().default("member"),
  status: invitationStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
