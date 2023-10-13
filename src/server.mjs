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

  // the network call returns quickly
  // but there is a random delay up to 10 seconds
  // before inserting the new message
  const delay = Math.round(Math.random() * 10_000)
  console.log('delay %dms, then adding message "%s"', delay, message)
  setTimeout(async () => {
    await db.read()
    db.data.messages.push(message)
    await db.write()
    console.log('wrote message to DB')
  }, delay)

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
