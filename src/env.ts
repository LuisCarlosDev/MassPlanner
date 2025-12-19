import z from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url().startsWith("postgresql://"),
  BETTER_AUTH_SECRET: z.string().trim().min(1),
  BETTER_AUTH_URL: z.string().trim().min(1),
});

export const env = envSchema.parse(Bun.env);
