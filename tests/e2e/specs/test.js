// https://docs.cypress.io/api/introduction/api.html

// import { visit } from "../utils";


describe('My First Test', () => {
  it('Visits the app root url', () => {
		// visit();
		cy.visit('/');
  })
})
