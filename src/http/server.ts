import { fastify } from 'fastify'
import { getUsers } from './routes/get-users'
import { getUsersFilter } from './routes/get-users-filter'
import { createUser } from './routes/create-user'
import { sendNotification } from './routes/send-notificatio'

const server = fastify()

server.register(getUsers)
server.register(getUsersFilter)
server.register(createUser)
server.register(sendNotification)

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running!')
  })
