/// <reference types="cypress" />

// using test function syntax
// all aliases defined before are available
// using "this.alias name"
it('has the message - A', function () {
  // confirm the list of messages includes
  // the "this.testMessage" value set by the e2e support hook
  // https://on.cypress.io/request
  // https://on.cypress.io/its
  cy.request('/messages')
    .its('body', { timeout: 0 })
    .should('include', this.testMessage)
})
