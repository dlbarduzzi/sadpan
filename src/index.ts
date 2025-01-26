import { serve } from "@hono/node-server"

import app from "./app"
import env from "@/lib/env"

const port = env.APP_PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
