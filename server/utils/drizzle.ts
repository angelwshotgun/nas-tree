import { drizzle } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema, logger: true })
}

export type User = typeof schema.users.$inferSelect
export type Todos = typeof schema.todos.$inferSelect;;
export type Accounts = typeof schema.accounts.$inferSelect;
export type verificationTokens = typeof schema.verificationTokens.$inferSelect;
export type Sessions = typeof schema.sessions.$inferSelect;
