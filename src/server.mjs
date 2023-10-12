import { initDatabase } from './database.mjs'
import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

const db = initDatabase()

fastify.get('/posts', async () => {
  await db.read()

  return db.posts
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3050 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

async function closeServer(signal) {
  console.log(`closing the server with the signal ${signal}`)
  await fastify.close()
  process.kill(process.pid, signal)
}
process.once('SIGINT', closeServer)
process.once('SIGTERM', closeServer)
