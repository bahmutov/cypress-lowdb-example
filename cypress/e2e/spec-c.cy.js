/// <reference types="cypress" />

it('has the message - C', () => {
  // confirm the Cypress.env object has "savedMessage" string value
  // https://on.cypress.io/env
  // using expect(...) assertion
  // https://glebbahmutov.com/cypress-examples/commands/assertions.html
  expect(Cypress.env('savedMessage'), 'saved message').to.be.a('string')
  // use the "savedMessage" from the Cypress.env object
  // to confirm it is present via cy.task "checkMessages"
  cy.task('checkMessage', Cypress.env('savedMessage')).should('be.true')
})