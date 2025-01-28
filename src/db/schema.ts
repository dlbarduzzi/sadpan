import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const alerts = sqliteTable("alerts", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }).notNull(),
  expr: text("expr").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(new Date())
    .$onUpdate(() => new Date()),
})

export const insertAlertSchema = createInsertSchema(alerts, {
  name: schema => schema.min(3).max(256),
  expr: schema => schema.min(6),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const selectAlertsSchema = createSelectSchema(alerts)
