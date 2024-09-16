import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { metas } from '../services/goals'

export async function createGoal(server: FastifyInstance) {
  const goalsSchema = z.object({
    title: z.string().min(1, 'O título deve ter no mínimo 1 caractere.'),
    description: z
      .string()
      .min(1, 'A descrição deve ter no mínimo 1 caractere.'),
    completed: z.boolean(),
    userId: z.string(),
  })

  server.post('/goal', async (request, reply) => {
    const data = goalsSchema.parse(request.body)

    const goal = await metas.createGoals(data)

    if (goal) {
      return reply.status(201).send(goal)
    }

    return reply.status(400).send({ message: 'Erro ao criar meta.' })
  })
}
