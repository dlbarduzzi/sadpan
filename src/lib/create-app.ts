import type { AppBindings } from "./types"
import type { ErrorHandler, NotFoundHandler } from "hono"

import { logger } from "@/middlewares/logger"
import { OpenAPIHono } from "@hono/zod-openapi"

import * as httpStatusCode from "@/http/status-code"
import * as httpStatusError from "@/http/status-error"

const notFound: NotFoundHandler = ctx => {
  return ctx.json(
    {
      code: httpStatusCode.NOT_FOUND,
      error: httpStatusError.NOT_FOUND,
    },
    httpStatusCode.NOT_FOUND
  )
}

const onError: ErrorHandler = (err, ctx) => {
  ctx.var.logger.error(err.stack)
  return ctx.json(
    {
      code: httpStatusCode.INTERNAL_SERVER_ERROR,
      error: httpStatusError.INTERNAL_SERVER_ERROR,
    },
    httpStatusCode.INTERNAL_SERVER_ERROR
  )
}

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false })
}

export function createApp() {
  const app = createRouter()

  app.use(logger())
  app.notFound(notFound)
  app.onError(onError)

  return app
}
