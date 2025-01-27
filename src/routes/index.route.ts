import { createRouter } from "@/lib/create-app"
import { createRoute, z } from "@hono/zod-openapi"

const router = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "SadPan API Index",
      },
    },
  }),
  ctx => {
    return ctx.json({ message: "SadPan API" }, 200)
  }
)

export default router
