import Elysia from "elysia";
import { authMacro } from "../../../macros/auth-macro";
import z from "zod";
import { db } from "../../../db/connection";
import { masses } from "../../../db/schema";

export const createMass = new Elysia().use(authMacro).post(
  "/mass",
  async ({ body }) => {
    const { name, celebrant, date, churchId } = body;

    await db.insert(masses).values({
      name,
      celebrant,
      date,
      churchId,
    });
  },
  {
    auth: true,
    detail: {
      summary: "Create a new mass",
      description: "Create a new mass",
      tags: ["Mass"],
    },
    body: z.object({
      name: z.string().trim().min(1),
      celebrant: z.string().trim().min(1),
      date: z.string().pipe(z.coerce.date()),
      churchId: z.string(),
    }),
  }
);
