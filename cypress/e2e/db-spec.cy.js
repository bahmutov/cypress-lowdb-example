/// <reference types="cypress" />

describe('LowDB database', () => {
  it('loads the initial set of messages', () => {
    cy.request('/messages')
      .its('body')
      .should('be.an', 'array')
      // print the messages to the console
      .then(console.table)
  })

  it('adds a new message', () => {
    const message = `message ${Cypress._.random(1e6)}`
    cy.request('POST', '/messages', { message })
  })
})
