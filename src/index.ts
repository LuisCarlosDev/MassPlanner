import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import z from "zod";
import { auth, OpenAPI } from "./lib/auth";
import cors from "@elysiajs/cors";
import { env } from "./env";
import { createMass } from "./http/routes/mass/create-mass";
import { getAllMass } from "./http/routes/mass/get-all-mass";
import { createChurch } from "./http/routes/church/create-church";

const app = new Elysia()
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .mount(auth.handler)
  .use(createChurch)
  .use(createMass)
  .use(getAllMass)
  .use(
    openapi({
      documentation: {
        info: {
          title: "Mass Planner API",
          version: "1.0.0",
          description: "API for create mass or celebrations",
        },
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    }),
  );

app.listen(env.PORT, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
});
