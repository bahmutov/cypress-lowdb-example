/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-recurse
import { recurse } from 'cypress-recurse'

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

    // you would need to check the messages
    // periodically until it appears or 11 seconds pass
    // Tip: use cypress-recurse plugin or write
    // a recursive function
    recurse(
      () => cy.task('checkMessage', message, { log: false }),
      Cypress._.identity,
      {
        log: `Found message "${message}"`,
        timeout: 11_000,
        delay: 100,
      },
    )
  })
})
