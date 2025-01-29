import { createApp } from "@/lib/create-app"

import configOpenAPI from "@/lib/config-openapi"

import index from "@/routes/index.route"
import alerts from "@/routes/alerts/alerts.index"

const app = createApp()
configOpenAPI(app)

const routes = [index, alerts] as const

routes.forEach(route => {
  app.route("/", route)
})

export type AppType = (typeof routes)[number]

export default app
