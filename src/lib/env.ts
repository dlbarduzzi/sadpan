import { config } from "dotenv"
import { expand } from "dotenv-expand"

import { z } from "zod"

expand(config())

const envSchema = z
  .object({
    NODE_ENV: z.string().default("development"),
    APP_PORT: z.coerce.number().default(9999),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTO_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTO_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTO_TOKEN"],
        message: "Must be set when NODE_ENV is 'production'",
      })
    }
  })

export type EnvSchema = z.infer<typeof envSchema>

// eslint-disable-next-line no-process-env
const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error("❌ Invalid Env ❌")
  console.error(JSON.stringify(env.error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

export default env.data
