import { createRoute, z } from "@hono/zod-openapi"
import { jsonContent, jsonContentRequired } from "@/lib/json-content"

import { createErrorSchema, notFoundSchema } from "@/lib/error-schema"
import { insertAlertSchema, patchAlertsSchema, selectAlertsSchema } from "@/db/schema"

import * as httpStatusCode from "@/http/status-code"
import * as httpStatusPhrase from "@/http/status-phrase"

const tags = ["Alerts"]

const idParamSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: 12,
  }),
})

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

export const getOne = createRoute({
  path: "/{id}",
  method: "get",
  request: {
    params: idParamSchema,
  },
  tags,
  responses: {
    [httpStatusCode.OK]: jsonContent(selectAlertsSchema, "The requested alert"),
    [httpStatusCode.NOT_FOUND]: jsonContent(notFoundSchema, "Alert not found"),
    [httpStatusCode.UNPROCESSABLE_CONTENT]: jsonContent(
      createErrorSchema(
        idParamSchema,
        httpStatusCode.UNPROCESSABLE_CONTENT,
        httpStatusPhrase.UNPROCESSABLE_CONTENT
      ),
      "Invalid id error"
    ),
  },
})

export const patch = createRoute({
  path: "/{id}",
  method: "patch",
  request: {
    params: idParamSchema,
    body: jsonContentRequired(patchAlertsSchema, "The alert to be updated"),
  },
  tags,
  responses: {
    [httpStatusCode.OK]: jsonContent(selectAlertsSchema, "The updated alert"),
    [httpStatusCode.NOT_FOUND]: jsonContent(notFoundSchema, "Alert not found"),
    [httpStatusCode.UNPROCESSABLE_CONTENT]: jsonContent(
      createErrorSchema(
        patchAlertsSchema,
        httpStatusCode.UNPROCESSABLE_CONTENT,
        httpStatusPhrase.UNPROCESSABLE_CONTENT
      ).or(idParamSchema),
      "The validation error(s)"
    ),
  },
})

export const remove = createRoute({
  path: "/{id}",
  method: "delete",
  request: {
    params: idParamSchema,
  },
  tags,
  responses: {
    [httpStatusCode.NO_CONTENT]: { description: "Alert deleted" },
    [httpStatusCode.NOT_FOUND]: jsonContent(notFoundSchema, "Alert not found"),
    [httpStatusCode.UNPROCESSABLE_CONTENT]: jsonContent(
      createErrorSchema(
        idParamSchema,
        httpStatusCode.UNPROCESSABLE_CONTENT,
        httpStatusPhrase.UNPROCESSABLE_CONTENT
      ),
      "Invalid id error"
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
