import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "./schema/index";

export const db = drizzle(Bun.env.DATABASE_URL!, {
  schema,
  casing: "snake_case",
});
