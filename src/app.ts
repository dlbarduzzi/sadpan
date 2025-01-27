import createApp from "@/lib/create-app"

const app = createApp()

app.get("/", ctx => {
  return ctx.text("Hello Hono!")
})

app.get("/error", () => {
  throw new Error("Oh no!")
})

export default app
