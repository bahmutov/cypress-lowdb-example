import { defineConfig } from 'cypress'
// import and initialize the database connection
// similarly to how the server code does it

export default defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3050',
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      // add on('task', { ... }) callbacks here
      // https://on.cypress.io/task
      // https://glebbahmutov.com/blog/powerful-cy-task/
    },
  },
})
