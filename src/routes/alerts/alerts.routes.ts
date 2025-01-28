import { createRoute, z } from "@hono/zod-openapi"
import { jsonContent, jsonContentRequired } from "@/lib/json-content"

import { createErrorSchema } from "@/lib/error-schema"
import { insertAlertSchema, selectAlertsSchema } from "@/db/schema"

import * as httpStatusCode from "@/http/status-code"
import * as httpStatusPhrase from "@/http/status-phrase"

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
    [httpStatusCode.CREATED]: jsonContent(selectAlertsSchema, "The created alert"),
    [httpStatusCode.UNPROCESSABLE_CONTENT]: jsonContent(
      createErrorSchema(
        insertAlertSchema,
        httpStatusCode.UNPROCESSABLE_CONTENT,
        httpStatusPhrase.UNPROCESSABLE_CONTENT
      ),
      "The validation error(s)"
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
