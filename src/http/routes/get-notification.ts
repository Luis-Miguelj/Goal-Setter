import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { notifications } from '../services/notification'

export async function getNotification(server: FastifyInstance) {
  const GetNotificationSchema = z.object({
    id: z.string(),
  })

  server.get('/get-notification/:id', async (request, reply) => {
    const { id } = GetNotificationSchema.parse(request.params)

    const getNotifications = await notifications.getNotification(id)

    if (getNotifications) {
      return reply.status(200).send(getNotifications)
    }
  })
}
