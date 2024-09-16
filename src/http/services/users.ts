import { db } from '../../db'
import { users } from '../../db/schema'
import { eq, ilike, and } from 'drizzle-orm'

import { z } from 'zod'

const tableUserSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type loginSchema = z.infer<typeof loginSchema>

type userSchema = z.infer<typeof tableUserSchema>

class User {
  async getUser() {
    const usuarios = await db.select().from(users)

    if (usuarios) {
      return usuarios
    }

    return { message: 'Nenhum usuario encontrado.' }
  }

  async getUserById(search: string) {
    const user = await db
      .select()
      .from(users)
      .where(ilike(users.name, `%${search}%`))

    if (user) {
      return { user }
    }

    return { message: 'Nenhum usuario encontrado.' }
  }

  async createUser(data: userSchema) {
    const user = await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (user) {
      return { message: 'Usuario criado com sucesso!' }
    }

    return { message: 'Erro ao criar usuario.' }
  }

  async loginUsuario(data: loginSchema) {
    const user = await db
      .select()
      .from(users)
      .where(
        and(eq(users.email, data.email), eq(users.password, data.password))
      )

    const usuario = user[0]

    if (user) {
      return { message: 'Usuario logado com sucesso!', user: usuario }
    }

    return { message: 'Erro ao logar usuario.' }
  }
}

export const user = new User()
