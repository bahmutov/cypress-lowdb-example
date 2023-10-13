/// <reference types="cypress" />

describe('LowDB database', () => {
  beforeEach(() => {
    cy.task('clearMessages')
  })

  it('adds a new message', () => {
    const message = `message ${Cypress._.random(1e6)}`
    cy.request('POST', '/messages', { message })
    // there is a delay up to 10 seconds
    // between posting a message and saving it in the database
    // to be safe, let's wait 11 seconds
    // On average the delay is 5 seconds, but it could be
    // really short. So we are slowing down a lot just to be safe
    // TODO: can you get rid of the hardcoded cy.wait?
    cy.wait(11_000)
    // you would need to check the messages
    // periodically until it appears or 11 seconds pass
    // Tip: use cypress-recurse plugin or write
    // a recursive function
    cy.task('checkMessage', message).should('be.true')
  })
})
