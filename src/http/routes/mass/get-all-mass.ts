import Elysia from "elysia";
import { authMacro } from "../../../macros/auth-macro";
import { db } from "../../../db/connection";
import { masses } from "../../../db/schema";
import z from "zod";

export const getAllMass = new Elysia().use(authMacro).get(
  "/mass",
  async () => {
    const all_masses = await db.query.masses.findMany({
      with: {
        church: {
          columns: {
            name: true,
            address: true,
          },
        },
      },
    });

    return all_masses;
  },
  {
    auth: true,
    detail: {
      summary: "Get all masses",
      tags: ["Mass"],
      description: "Retrieve a list of all masses",
    },
  },
);
