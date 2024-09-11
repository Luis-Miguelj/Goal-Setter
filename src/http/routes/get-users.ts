import type { FastifyInstance } from 'fastify'
import { user } from '../services/users'

export async function getUsers(server: FastifyInstance) {
  server.get('/users', async (request, reply) => {
    const users = await user.getUser()

    return reply.status(200).send(users)
  })
}
