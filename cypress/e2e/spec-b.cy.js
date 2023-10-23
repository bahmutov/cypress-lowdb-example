/// <reference types="cypress" />

// using arrow expression test function
it('has the message - B', () => {
  // get the value of the alias "testMessage"
  // https://on.cypress.io/get
  // and pass it to the cy.then callback
  // confirm the messages on the server include
  // the test message value
  // https://on.cypress.io/request
  // https://on.cypress.io/its
  cy.get('@testMessage').then((message) => {
    cy.request('/messages')
      .its('body', { timeout: 0 })
      .should('include', message)
  })
})
