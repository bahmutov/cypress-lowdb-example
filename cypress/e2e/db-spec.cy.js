/// <reference types="cypress" />

describe('LowDB database', () => {
  beforeEach(() => {
    cy.task('clearMessages')
  })

  it('adds a new message', () => {
    const message = `message ${Cypress._.random(1e6)}`
    cy.request('POST', '/messages', { message })
    // call the cy.task "checkMessage" once
    // and confirm it yields true value
    // Tip: all the retries are done inside that task
    cy.task('checkMessage', message).should('be.true')
  })
})
