import { z } from 'zod'

const envSchema = z.object({
  DATABASE: z.string(),
  DATABASE_URL: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
})

export const env = envSchema.parse(process.env)
