import { createRouter } from "@/lib/create-app"

import * as routes from "./alerts.routes"
import * as handlers from "./alerts.handlers"

const router = createRouter().openapi(routes.list, handlers.list)

export default router
