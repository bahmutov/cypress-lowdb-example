import { defineConfig } from 'cypress'
// import and initialize the database connection
// similarly to how the server code does it
import { initDatabase } from './src/database.mjs'
// https://github.com/bahmutov/cypress-recurse
import { retry } from 'cypress-recurse/src/retry.js'

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

      async function getMessages() {
        // refresh the data and check the list
        await db.read()
        console.log('checking %d messages', db.data.messages.length)
        return db.data.messages
      }

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
          // TODO: use the "retry" function to call "getMessages"
          // until the list includes the given message
          // return a boolean result to the Cypress test
        },
      })
    },
  },
})
