/// <reference types="cypress" />

describe('LowDB database', () => {
  beforeEach(() => {
    // clear all messages from the database
    // by calling task "clearMessages"
    // (details of the task are in the cypress.config.mjs file)
    // https://on.cypress.io/task
    cy.task('clearMessages')
  })

  it('loads the initial set of messages', () => {
    cy.request('/messages')
      .its('body')
      .should('be.an', 'array')
      // confirm the list is empty
      .and('be.empty')
  })

  it('adds a new message', () => {
    const message = `message ${Cypress._.random(1e6)}`
    cy.request('POST', '/messages', { message })
    // we need to verify that the message was stored in the database
    // we cannot access the database directly from the browser
    // instead call cy.task "checkMessage" and pass the message
    // (details of the task are in the cypress.config.mjs file)
    // https://on.cypress.io/task
    cy.task('checkMessage', message).should('be.true')
  })
})
