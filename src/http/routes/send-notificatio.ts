import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { notifications } from '../services/notification'
export async function sendNotification(server: FastifyInstance) {
  const NotificationSchema = z.object({
    userId: z.string(),
    title: z.string(),
    message: z.string(),
    sendUser: z.string(),
  })

  server.post('/send-notification', async (request, reply) => {
    const data = NotificationSchema.parse(request.body)
    const sendNotification = await notifications.sendNotification(data)

    if (sendNotification) {
      return reply.status(200).send(sendNotification)
    }

    return reply.status(400).send({ message: 'Erro ao enviar notificação.' })
  })
}
