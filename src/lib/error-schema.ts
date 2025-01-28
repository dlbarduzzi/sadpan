import type { ZodSchema } from "./types"

import { z } from "@hono/zod-openapi"

export const createErrorSchema = <T extends ZodSchema>(
  schema: T,
  code: number,
  error: string
) => {
  const parsed = schema.safeParse(
    schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {}
  )
  return z.object({
    ok: z.boolean().openapi({
      example: false,
    }),
    code: z.number().positive().openapi({ example: code }),
    error: z.string().openapi({ example: error }),
    fieldErrors: z
      .object({
        issues: z.array(
          z.object({
            code: z.string(),
            path: z.array(z.union([z.string(), z.number()])),
            message: z.string().optional(),
          })
        ),
        name: z.string(),
      })
      .openapi({
        example: parsed.error,
      }),
  })
}
