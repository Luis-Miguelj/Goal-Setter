import type { FastifyInstance } from 'fastify'
import z from 'zod'

import { user } from '../services/users'

export async function createUser(server: FastifyInstance) {
  const tableUserSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6),
  })

  server.post('/user', async (request, reply) => {
    const data = tableUserSchema.parse(request.body)

    const usuario = user.createUser(data)

    if (!usuario) {
      return reply.status(400).send({ message: 'Erro ao criar usuario.' })
    }

    return reply.status(201).send(usuario)
  })
}
