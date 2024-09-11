import { client, db } from '.'
import { users } from './schema'

async function seed() {
  await db.delete(users)

  await db.insert(users).values([
    { name: 'Luis', email: 'l@gmail.com', password: '123456', admin: true },
    { name: 'Miguel', email: 'm@gmail.com', password: '123456', admin: false },
    { name: 'Caio', email: 'c@gmail.com', password: '123456', admin: false },
    { name: 'Aline', email: 'a@gmail.com', password: '123456', admin: false },
    { name: 'Roberto', email: 'r@gmail.com', password: '123456', admin: false },
    { name: 'Sanny', email: 'sb@gmail.com', password: '123456', admin: true },
    { name: 'Sidnei', email: 'sd@gmail.com', password: '123456', admin: false },
    { name: 'Rosane', email: 'rb@gmail.com', password: '123456', admin: false },
    { name: 'Neytan', email: 'nb@gmail.com', password: '123456', admin: false },
  ])
}

seed()
  .then(() => {
    console.log('Seed executado com sucesso!')
  })
  .catch(err => {
    console.error('Erro ao executar seed:', new Error(err))
  })
  .finally(() => {
    client.end()
  })
