import { defineConfig } from 'drizzle-kit'
// import { env } from './src/env'

export default defineConfig({
  schema: './src/db/schema.ts', // Apenas localmente para Drizzle, não é passado para o banco de dados
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    database: process.env.DATABASE as string,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: 5435,
    host: '0.0.0.0',
  },
})
