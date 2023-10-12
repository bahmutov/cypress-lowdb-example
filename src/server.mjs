import { initDatabase } from './database.mjs'
import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

const db = initDatabase()

fastify.get('/messages', async () => {
  await db.read()

  const { messages } = db.data
  console.log('returning %d messages', messages.length)
  return messages
})

fastify.post('/messages', async (req) => {
  const { message } = req.body
  console.log('adding message %s', message)
  db.data.messages.push(message)

  await db.write()

  return { message }
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
