import { createApp } from "@/lib/create-app"

import index from "@/routes/index.route"
import configOpenAPI from "@/lib/config-openapi"

const app = createApp()
configOpenAPI(app)

const routes = [index]

routes.forEach(route => {
  app.route("/", route)
})

export default app
