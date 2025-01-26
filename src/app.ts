import { OpenAPIHono } from "@hono/zod-openapi"

const app = new OpenAPIHono()

app.get("/", ctx => {
  return ctx.text("Hello Hono!")
})

app.get("/error", () => {
  throw new Error("Oh no!")
})

app.notFound(ctx => {
  return ctx.json(
    {
      code: 404,
      error: "Resource not found.",
    },
    404
  )
})

app.onError((err, ctx) => {
  console.error(err.stack)
  return ctx.json(
    {
      code: 500,
      error: "Internal server error.",
    },
    500
  )
})

export default app
