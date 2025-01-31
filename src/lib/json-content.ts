import type { ZodSchema } from "./types"

export function jsonContent<T extends ZodSchema>(schema: T, description: string) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  }
}

export function jsonContentRequired<T extends ZodSchema>(
  schema: T,
  description: string
) {
  return {
    ...jsonContent(schema, description),
    required: true,
  }
}
