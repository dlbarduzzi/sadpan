import { createRouter } from "@/lib/create-app"

import * as routes from "./alerts.routes"
import * as handlers from "./alerts.handlers"

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)

export default router
