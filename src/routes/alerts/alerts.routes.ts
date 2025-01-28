import { createRoute, z } from "@hono/zod-openapi"
import { jsonContent } from "@/lib/json-content"

import * as httpStatusCode from "@/http/status-code"

const tags = ["Alerts"]

export const list = createRoute({
  path: "/",
  method: "get",
  tags,
  responses: {
    [httpStatusCode.OK]: jsonContent(
      z.array(
        z.object({
          name: z.string(),
          status: z.enum(["inactive", "pending", "firing"]),
        })
      ),
      "The list of alerts"
    ),
  },
})

export type ListRoute = typeof list
