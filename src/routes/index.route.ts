import type { ZodSchema } from "zod"

import { createRouter } from "@/lib/create-app"
import { createRoute, z } from "@hono/zod-openapi"

import * as httpStatusCode from "@/http/status-code"

function jsonContent<T extends ZodSchema>(schema: T, description: string) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  }
}

const router = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/api",
    responses: {
      [httpStatusCode.OK]: jsonContent(
        z.object({ message: z.string() }),
        "SadPan API Index"
      ),
    },
  }),
  ctx => {
    return ctx.json({ message: "SadPan API" }, httpStatusCode.OK)
  }
)

export default router
