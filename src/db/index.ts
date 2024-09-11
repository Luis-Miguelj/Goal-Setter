import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export const client = postgres({
  db: 'postgres://docker:docker@localhost:5435/service',
  user: 'docker',
  password: 'docker',
  database: 'service',
  port: 5435,
})
export const db = drizzle(client, { schema, logger: true })
