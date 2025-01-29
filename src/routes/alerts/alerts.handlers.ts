import type { ListRoute, CreateRoute, GetOneRoute } from "./alerts.routes"
import type { AppRouteHandler } from "@/lib/types"

import db from "@/db"
import { alerts } from "@/db/schema"

import * as httpStatusCode from "@/http/status-code"

export const list: AppRouteHandler<ListRoute> = async ctx => {
  const alerts = await db.query.alerts.findMany()
  return ctx.json(alerts, httpStatusCode.OK)
}

export const create: AppRouteHandler<CreateRoute> = async ctx => {
  const alert = ctx.req.valid("json")
  const [inserted] = await db.insert(alerts).values(alert).returning()
  return ctx.json(inserted, httpStatusCode.CREATED)
}

export const getOne: AppRouteHandler<GetOneRoute> = async ctx => {
  const { id } = ctx.req.valid("param")
  const alert = await db.query.alerts.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
  })
  if (!alert) {
    return ctx.json(
      { message: `Alert with id '${id}' was not found` },
      httpStatusCode.NOT_FOUND
    )
  }
  return ctx.json(alert, httpStatusCode.OK)
}
