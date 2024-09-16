import { ilike } from 'drizzle-orm'
import { db } from '../../db'
import { goals } from '../../db/schema'
import { z } from 'zod'

const goalsSchema = z.object({
  title: z.string().min(1, 'O título deve ter no mínimo 1 caractere.'),
  description: z.string().min(1, 'A descrição deve ter no mínimo 1 caractere.'),
  completed: z.boolean(),
  userId: z.string(),
})

export type metas = z.infer<typeof goalsSchema>

class Goals {
  async getGoals(search?: string) {
    if (!search) {
      const metas = await db.select().from(goals).orderBy(goals.createdAt)

      if (metas) {
        return {
          metas,
        }
      }
    }

    const metas = await db
      .select()
      .from(goals)
      .where(ilike(goals.title, `%${search}%`))
      .orderBy(goals.createdAt)

    if (metas) {
      return {
        metas,
      }
    }

    return { message: 'Nenhuma meta encontrada.' }
  }

  async createGoals(data: metas) {
    const metas = await db
      .insert(goals)
      .values({
        title: data.title,
        description: data.description,
        completed: data.completed,
        userId: data.userId,
      })
      .returning()
    const meta = metas[0]

    if (metas) {
      return {
        message: 'Meta criada com sucesso.',
        meta,
      }
    }

    return { message: 'Erro ao criar meta.' }
  }
}

export const metas = new Goals()
