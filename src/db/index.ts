import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

export const client = postgres({
  db: env.DATABASE_URL,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE,
  port: 5435,
})
export const db = drizzle(client, { schema, logger: true })
