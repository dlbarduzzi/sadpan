import type { ZodSchema } from "zod"

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
