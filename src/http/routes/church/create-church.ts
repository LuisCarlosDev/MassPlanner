import Elysia from "elysia";
import { authMacro } from "../../../macros/auth-macro";
import z from "zod";
import { db } from "../../../db/connection";
import { churches, churchTypeEnum } from "../../../db/schema";

export const createChurch = new Elysia().use(authMacro).post(
  "/church",
  async ({ body, session }) => {
    const { name, type, address } = body;
    const organizationId = session.activeOrganizationId;

    if (!organizationId) {
      return new Response("Organization ID is required", { status: 400 });
    }

    await db.insert(churches).values({
      name,
      type,
      address,
      organizationId,
    });
  },
  {
    auth: true,
    detail: {
      tags: ["Church"],
      summary: "Create a new church",
      description: "Create a new church",
    },
    body: z.object({
      name: z.string().trim().min(1),
      type: z.enum(["parish", "community"]),
      address: z.string().trim().min(1),
    }),
  },
);
