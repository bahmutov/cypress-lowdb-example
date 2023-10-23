import { defineConfig } from 'cypress'
// import and initialize the database connection
// similarly to how the server code does it
import { initDatabase } from './src/database.mjs'
import { retry } from 'cypress-recurse/src/retry.js'

// https://github.com/bahmutov/cypress-data-session
import registerDataSession from 'cypress-data-session/src/plugin.js'

export default defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3050',
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // register the data session plugin
      // to be able to use "shareAcrossSpecs: true"
      registerDataSession(on, config)

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
        async addMessage(s) {
          await db.read()
          db.data.messages.push(s)
          await db.write()
          console.log('added message "%s"', s)
          // cy.task callback must return anything
          // but undefined
          return null
        },
        async checkMessage(message) {
          // use the "retry" function to call "getMessages"
          // until the list includes the given message
          // return a boolean result to the Cypress test
          const found = await retry(
            getMessages,
            (messages) => messages.includes(message),
            {
              log: true,
              limit: 11,
              delay: 1000,
            },
          )
          return found.length > 0
        },
      })
    },
  },
})
