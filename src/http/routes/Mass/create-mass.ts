import Elysia from "elysia";
import { authMacro } from "../../../macros/auth-macro";

export const createMass = new Elysia().use(authMacro).post("/mass", () => {});
