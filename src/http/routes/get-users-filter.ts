import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { user } from '../services/users'

const getUsersFilterSchema = z.object({
  search: z.string(),
})

export async function getUsersFilter(server: FastifyInstance) {
  server.get('/users/:search', async (request, reply) => {
    const { search } = getUsersFilterSchema.parse(request.params)

    const users = await user.getUserById(search)

    if (!users) {
      return reply.status(404).send({ message: 'Nenhum usuario encontrado.' })
    }

    return reply.status(200).send(users)
  })
}
