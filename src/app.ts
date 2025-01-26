import type { PinoLogger } from "hono-pino"

import { logger } from "@/middlewares/logger"
import { OpenAPIHono } from "@hono/zod-openapi"

import { config } from "dotenv"
import { expand } from "dotenv-expand"

import * as httpStatusCode from "@/http/status-code"
import * as httpStatusError from "@/http/status-error"

expand(config())

type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

const app = new OpenAPIHono<AppBindings>()
app.use(logger())

app.get("/", ctx => {
  return ctx.text("Hello Hono!")
})

app.get("/error", () => {
  throw new Error("Oh no!")
})

app.notFound(ctx => {
  return ctx.json(
    {
      code: httpStatusCode.NOT_FOUND,
      error: httpStatusError.NOT_FOUND,
    },
    httpStatusCode.NOT_FOUND
  )
})

app.onError((err, ctx) => {
  ctx.var.logger.error(err.stack)
  return ctx.json(
    {
      code: httpStatusCode.INTERNAL_SERVER_ERROR,
      error: httpStatusError.INTERNAL_SERVER_ERROR,
    },
    httpStatusCode.INTERNAL_SERVER_ERROR
  )
})

export default app
