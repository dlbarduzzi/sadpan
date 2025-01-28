import { createRoute, z } from "@hono/zod-openapi"

import { jsonContent } from "@/lib/json-content"
import { createRouter } from "@/lib/create-app"

import * as httpStatusCode from "@/http/status-code"

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    path: "/",
    method: "get",
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
