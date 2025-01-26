import { config } from "dotenv"
import { expand } from "dotenv-expand"

import { z } from "zod"

expand(config())

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  APP_PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
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
