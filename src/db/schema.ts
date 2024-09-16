import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  admin: boolean('admin').notNull().default(false),
})

export const notification = pgTable('notification', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  sendUser: text('send_user').notNull(),
  read: boolean('read').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const tasks = pgTable('tasks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  completed: boolean('completed').notNull().default(false),
})

export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  completed: boolean('completed').notNull().default(false),
})
