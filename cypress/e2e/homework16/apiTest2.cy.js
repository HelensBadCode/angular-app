import positiveCases from '../../fixtures/positiveCases.json';
import negativeCases from '../../fixtures/negativeCases.json';
describe('Test get list of posts', {
  env: {
    API_URL: "https://jsonplaceholder.typicode.com/"
  }
} ,()=>{

  const statusOK = positiveCases.status;
  const statusError = negativeCases.status;
  const nameSection = negativeCases.nameSection;

  it('should successfully return list of posts ', () => {
    cy.api({
      url: `${Cypress.env("API_URL")}/posts`
    }).as("getPosts");

    cy.get("@getPosts").its("status").should("eq", statusOK);

    cy.get("@getPosts").then(response => {
      const responseBody = response.body;
      expect(responseBody).to.be.an("array");
      const keysToCheck = ["id", "title", "body", "userId"];
      responseBody.forEach(post => {
        expect(post).to.have.property("id");
        expect(post).to.have.property("title");
        expect(post).to.have.property("body");
        expect(post).to.have.property("userId");
      });
    });
  });

  it('should check negative case for request list of posts ', () => {
    cy.api({
      url: `${Cypress.env("API_URL")}/${nameSection}`,
      failOnStatusCode: false
    }).as("getPosts");

    cy.get("@getPosts").its("status").should("eq", statusError);
    cy.get("@getPosts").its("body").should("be.an", "object").and("be.empty");
  });

});
