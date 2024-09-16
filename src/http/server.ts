import { fastify } from 'fastify'
import { getUsers } from './routes/get-users'
import { getUsersFilter } from './routes/get-users-filter'
import { createUser } from './routes/create-user'
import { sendNotification } from './routes/send-notificatio'
import { getNotification } from './routes/get-notification'
import { loginUser } from './routes/login-user'
import { getGoals } from './routes/get-goals'
import { createGoal } from './routes/create-goal'

const server = fastify()

server.register(getUsers)
server.register(getUsersFilter)
server.register(createUser)
server.register(sendNotification)
server.register(getNotification)
server.register(loginUser)
server.register(getGoals)
server.register(createGoal)

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running!')
  })
