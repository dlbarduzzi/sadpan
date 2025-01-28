import { createApp } from "@/lib/create-app"

import configOpenAPI from "@/lib/config-openapi"

import index from "@/routes/index.route"
import alerts from "@/routes/alerts/alerts.index"

const app = createApp()
configOpenAPI(app)

app.route("/api/v1/index", index)
app.route("/api/v1/alerts", alerts)

export default app
