import { createRouter } from "@/lib/create-app"

import * as routes from "./alerts.routes"
import * as handlers from "./alerts.handlers"

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)

export default router
