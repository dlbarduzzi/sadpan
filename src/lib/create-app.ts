import type { AppBindings } from "./types"
import type { ErrorHandler, NotFoundHandler } from "hono"

import { logger } from "@/middlewares/logger"
import { OpenAPIHono } from "@hono/zod-openapi"

import * as httpStatusCode from "@/http/status-code"
import * as httpStatusPhrase from "@/http/status-phrase"

const notFound: NotFoundHandler = ctx => {
  return ctx.json(
    {
      ok: false,
      code: httpStatusCode.NOT_FOUND,
      error: httpStatusPhrase.NOT_FOUND,
    },
    httpStatusCode.NOT_FOUND
  )
}

const onError: ErrorHandler = (err, ctx) => {
  ctx.var.logger.error(err.stack)
  return ctx.json(
    {
      ok: false,
      code: httpStatusCode.INTERNAL_SERVER_ERROR,
      error: httpStatusPhrase.INTERNAL_SERVER_ERROR,
    },
    httpStatusCode.INTERNAL_SERVER_ERROR
  )
}

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (res, ctx) => {
      if (!res.success) {
        ctx.var.logger.error(res.error)
        return ctx.json(
          {
            ok: false,
            code: httpStatusCode.UNPROCESSABLE_CONTENT,
            error: httpStatusPhrase.UNPROCESSABLE_CONTENT,
            fieldErrors: res.error.flatten().fieldErrors,
          },
          httpStatusCode.UNPROCESSABLE_CONTENT
        )
      }
    },
  })
}

export function createApp() {
  const app = createRouter()

  app.use(logger())
  app.notFound(notFound)
  app.onError(onError)

  return app
}
