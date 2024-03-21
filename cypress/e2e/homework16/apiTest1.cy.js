import positiveCases from '../../fixtures/positiveCases.json';
import negativeCases from '../../fixtures/negativeCases.json';
describe('Test get post by id', {
  env: {
    API_URL: "https://jsonplaceholder.typicode.com/"
  }
} ,()=>{

  const postID1 = positiveCases.id;
  const userID1 = positiveCases.userId;
  const statusOK = positiveCases.status;

  const postID2 = negativeCases.id;
  const statusError = negativeCases.status;

  it('should successfully return post by id ', () => {
    cy.api({
      url: `${Cypress.env("API_URL")}/posts/${postID1}`
    }).as("getPost");

    cy.get("@getPost").its("status").should("eq", statusOK);
    cy.get("@getPost").its("body.id").should("eq", postID1);
    cy.get("@getPost").its("body.userId").should("eq", userID1);

    cy.get("@getPost").then(response => {
      const responseBody = response.body;
      const keysToCheck = ["id", "title", "body", "userId"];
      keysToCheck.forEach(key => {
        expect(responseBody).to.have.property(key);
      });
    });
  });

  it('should check negative case for request by id ', () => {
    cy.api({
      url: `${Cypress.env("API_URL")}/posts/${postID2}`,
      failOnStatusCode: false
    }).as("getPost");

    cy.get("@getPost").its("status").should("eq", statusError);
    cy.get("@getPost").its("body").should("be.an", "object").and("be.empty");

  });

});
