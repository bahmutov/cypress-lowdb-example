/// <reference types="cypress-data-session" />

// https://github.com/bahmutov/cypress-data-session
import 'cypress-data-session'

beforeEach(function addMessage() {
  // create a new data session that inserts a random string message
  // into the database using cy.task "addMessage"
  // The data session should validate its current value
  // by calling cy.task "checkMessage" to ensure some test
  // has no cleared it accidentally
  // The data session should persist in the config Node process
  // to work across all specs
  cy.dataSession({
    name: 'testMessage',
    setup() {
      const k = Cypress._.random(1e4)
      const message = `random test message ${k}`
      cy.task('addMessage', message)
      // we want to keep the test message itself
      // in the data session, so cy.wrap the string
      cy.wrap(message)
    },
    validate(message) {
      cy.task('checkMessage', message).should('be.true')
    },
    shareAcrossSpecs: true,
  })
    // cy.dataSession yields the stored value
    // can you save it in the current Cypress.env object
    // under name "savedMessage"?
    // https://on.cypress.io/env
    .then((message) => Cypress.env('savedMessage', message))
})
