import { desc, ilike } from 'drizzle-orm'

import { db } from '../../db'
import { notification, users } from '../../db/schema'

import { z } from 'zod'

const NotificationSchema = z.object({
  userId: z.string(),
  title: z.string(),
  message: z.string(),
  sendUserId: z.string(),
})

type notificationSchema = z.infer<typeof NotificationSchema>

class Notification {
  async getNotification(id: string) {
    const getNotifications = await db
      .select()
      .from(notification)
      .where(ilike(notification.userId, `%${id}%`))
      .orderBy(desc(notification.createdAt))

    if (getNotifications) {
      return {
        getNotifications,
      }
    }

    return { message: 'Nenhuma notificação encontrada.' }
  }

  async sendNotification(data: notificationSchema) {
    const sendNotification = await db
      .insert(notification)
      .values({
        userId: data.userId,
        title: data.title,
        message: data.message,
        sendUserId: data.sendUserId,
      })
      .returning()

    const username = await db
      .select()
      .from(users)
      .where(ilike(users.id, data.userId))

    const notificationData = sendNotification[0]
    const user = username[0].name

    if (notificationData) {
      return {
        notificationData,
        user,
      }
    }

    return { message: 'Erro ao enviar notificação.' }
  }
}

export const notifications = new Notification()
