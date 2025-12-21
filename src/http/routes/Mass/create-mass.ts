import Elysia from "elysia";
import { authMacro } from "../../../macros/auth-macro";
import z from "zod";
import { db } from "../../../db/connection";
import { masses } from "../../../db/schema";
import openapi from "@elysiajs/openapi";

export const createMass = new Elysia().use(authMacro).post(
  "/mass",
  async ({ body }) => {
    const { name, celebrant, date, location } = body;

    await db.insert(masses).values({
      name,
      celebrant,
      date,
      location,
    });
  },
  {
    detail: {
      summary: "Create a new mass",
      tags: ["Mass"],
    },
    body: z.object({
      name: z.string().trim().min(1),
      celebrant: z.string().trim().min(1),
      date: z.coerce.date(),
      location: z.string().trim().min(1),
    }),
  },
);
