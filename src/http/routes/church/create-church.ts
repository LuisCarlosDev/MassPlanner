import Elysia from "elysia";
import { authMacro } from "../../../macros/auth-macro";
import z from "zod";
import { db } from "../../../db/connection";
import { churches } from "../../../db/schema";

export const createChurch = new Elysia().use(authMacro).post(
  "/church",
  async ({ body }) => {
    const { name, type, address } = body;

    await db.insert(churches).values({
      name,
      type,
      address,
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
