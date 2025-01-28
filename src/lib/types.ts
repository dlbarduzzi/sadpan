import type { PinoLogger } from "hono-pino"
import type { z, OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"

export type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>
