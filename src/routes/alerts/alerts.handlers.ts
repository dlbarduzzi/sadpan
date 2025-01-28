import type { ListRoute, CreateRoute } from "./alerts.routes"
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
