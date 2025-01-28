import type { ListRoute } from "./alerts.routes"
import type { AppRouteHandler } from "@/lib/types"

export const list: AppRouteHandler<ListRoute> = ctx => {
  return ctx.json([
    {
      name: "SampleAlert",
      status: "firing",
    },
  ])
}
