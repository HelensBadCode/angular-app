import positiveCases from '../../fixtures/positiveCases.json';
import negativeCases from '../../fixtures/negativeCases.json';
import createPost from '../../fixtures/createPost.json';

describe('Test add new post', {
  env: {
    API_URL: "https://jsonplaceholder.typicode.com/"
  }
} ,()=>{
  const requestBody = createPost.testData1;
  const statusOK = positiveCases.statusADD;
  const nameSection = negativeCases.nameSection;
  const statusError = negativeCases.status;
  const requestBody2 = createPost.testData2;

  it('should successfully create new post ', () => {

    cy.api({
      method: 'POST',
      url: `${Cypress.env("API_URL")}/posts`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: requestBody
    }).as("createPost");

    cy.get("@createPost").its('status').should("eq", statusOK);
    cy.get("@createPost").its('body').should('contain', requestBody);


    cy.wrap(requestBody).then(body => {
      Cypress._.each(Object.keys(body), key => {
        cy.get("@createPost").its('body').should('have.property', key);
      });
    });

    cy.get("@createPost").then(response => {
      const createdPost = response.body;
      expect(createdPost.userId).to.equal(requestBody.userId);
    });

  });

  it.only('should failed create new post ', () => {
    cy.api({
      method: 'POST',
      url: `${Cypress.env("API_URL")}/${nameSection}`,
      failOnStatusCode: false,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: requestBody2
    }).as("createPost");

  cy.get("@createPost").its("status").should("eq", statusError);
  cy.get("@createPost").its("body").should("be.an", "object").and("be.empty");

  });
})
