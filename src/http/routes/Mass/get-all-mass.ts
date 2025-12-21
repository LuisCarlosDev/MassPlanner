import Elysia from "elysia";
import { authMacro } from "../../../macros/auth-macro";
import { db } from "../../../db/connection";
import { masses } from "../../../db/schema";

export const getAllMass = new Elysia().use(authMacro).get(
  "/mass",
  async () => {
    const all_masses = await db.select().from(masses);

    return all_masses;
  },
  {
    detail: {
      summary: "Get all masses",
      tags: ["Mass"],
      description: "Retrieve a list of all masses",
    },
  },
);
