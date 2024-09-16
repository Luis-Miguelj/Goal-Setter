import type { FastifyInstance } from 'fastify'
import { user } from '../services/users'

import z from 'zod'

export async function loginUser(server: FastifyInstance) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  server.post('/login', async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body)

    const { user: usuario } = await user.loginUsuario({ email, password })

    if (!usuario) {
      return reply.status(400).send({ message: 'Erro ao logar usuario.' })
    }

    return reply
      .status(200)
      .send({ message: 'Usuario logado com sucesso!', usuario })
  })
}
