import positiveCases from "../../fixtures/positiveCases.json";
import negativeCases from "../../fixtures/negativeCases.json";

describe('Test get post by id', {
  env: {
    API_URL: "https://jsonplaceholder.typicode.com/"
  }
} ,()=>{
  const postID1 = positiveCases.id;
  const statusOK = positiveCases.status;
  const nameSection = negativeCases.nameSection;
  const statusError = negativeCases.status;

  it('should delete post by id ', () => {
    cy.api({
      method: 'DELETE',
      url: `${Cypress.env("API_URL")}/posts/${postID1}`
    }).as("deletePost");

    cy.get("@deletePost").its('status').should("eq", statusOK);

  });

  it('should check negative case of delete post ', () => {
    cy.api({
      method: 'DELETE',
      url: `${Cypress.env("API_URL")}/${nameSection}/${postID1}`,
      failOnStatusCode: false
    }).as("deletePost");

    cy.get("@deletePost").its('status').should("eq", statusError);

  });

  // it('should check successes delete test', () => {
  //   cy.api({
  //     method: 'GET',
  //     url: `${Cypress.env("API_URL")}/posts/5`
  //   }).as("getPost");
  //
  //   cy.get("@getPost").its('status').should("eq", 404);
  //
  // });
})

