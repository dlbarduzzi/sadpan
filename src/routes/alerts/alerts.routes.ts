import { createRoute, z } from "@hono/zod-openapi"
import { jsonContent, jsonContentRequired } from "@/lib/json-content"

import * as httpStatusCode from "@/http/status-code"
import { insertAlertSchema, selectAlertsSchema } from "@/db/schema"

const tags = ["Alerts"]

export const list = createRoute({
  path: "/",
  method: "get",
  tags,
  responses: {
    [httpStatusCode.OK]: jsonContent(z.array(selectAlertsSchema), "The list of alerts"),
  },
})

export const create = createRoute({
  path: "/",
  method: "post",
  request: {
    body: jsonContentRequired(insertAlertSchema, "The alert to be created"),
  },
  tags,
  responses: {
    [httpStatusCode.CREATED]: jsonContent(selectAlertsSchema, "Create a new alert"),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
