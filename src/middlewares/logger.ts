import pino from "pino"
import pretty from "pino-pretty"
import { pinoLogger } from "hono-pino"

import env from "@/lib/env"

export function logger() {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL || "info",
      },
      env.NODE_ENV === "production" ? undefined : pretty()
    ),
    http: {
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      reqId: () => crypto.randomUUID(),
    },
  })
}
