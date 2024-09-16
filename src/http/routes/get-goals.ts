import type { FastifyInstance } from 'fastify'
import { metas } from '../services/goals'
import { z } from 'zod'

export async function getGoals(server: FastifyInstance) {
  const goalsSchema = z.object({
    search: z.string().optional(),
  })

  server.get('/goals/:search', async (request, reply) => {
    const { search } = goalsSchema.parse(request.params)

    const goals = await metas.getGoals(search)

    if (goals) {
      return reply.status(200).send(goals)
    }

    return reply.status(404).send({ message: 'Nenhuma meta encontrada.' })
  })
}
