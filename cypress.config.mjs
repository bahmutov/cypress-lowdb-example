import { defineConfig } from 'cypress'
// import and initialize the database connection
// similarly to how the server code does it
import { initDatabase } from './src/database.mjs'

export default defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3050',
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      const db = initDatabase()

      on('task', {
        async clearMessages() {
          console.log('clearMessages')
          db.data.messages.length = 0
          await db.write()
          // cy.task callback must return anything
          // but undefined
          return null
        },
        async checkMessage(message) {
          // refresh the data and check the list
          await db.read()
          console.log('checking %d messages', db.data.messages.length)
          return db.data.messages.includes(message)
        },
      })
    },
  },
})
