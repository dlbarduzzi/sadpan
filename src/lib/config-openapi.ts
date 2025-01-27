import type { AppOpenAPI } from "./types"

import packageJSON from "../../package.json"
import { apiReference } from "@scalar/hono-api-reference"

export default function configOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "SadPan API",
    },
  })
  app.get(
    "/reference",
    apiReference({
      theme: "bluePlanet",
      layout: "classic",
      spec: {
        url: "/doc",
      },
    })
  )
}
