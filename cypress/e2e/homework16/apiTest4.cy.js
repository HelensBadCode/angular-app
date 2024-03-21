import positiveCases from '../../fixtures/positiveCases.json';
import negativeCases from '../../fixtures/negativeCases.json';
import updatePost from '../../fixtures/updatePost.json';


describe('Test update post by id', {
  env: {
    API_URL: "https://jsonplaceholder.typicode.com/"
  }
} ,()=>{
  const postID1 = positiveCases.id;
  const requestBody = updatePost.testData1;
  const statusOK = positiveCases.status;
  const statusError = negativeCases.status500;
  const requestBody2 = updatePost.testData2;
  const postID2 = negativeCases.id;

  it('should successfully update post ', () => {
    cy.api({
      method: 'PUT',
      url: `${Cypress.env("API_URL")}/posts/${postID1}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: requestBody
    }).as("updatePost");

    cy.get("@updatePost").its('status').should("eq", statusOK);
    cy.get("@updatePost").its('body').should('contain', requestBody);

    cy.wrap(requestBody).then(body => {
      Cypress._.each(Object.keys(body), key => {
        cy.get("@updatePost").its('body').should('have.property', key);
      });
    });

    cy.get("@updatePost").then(response => {
      const updatedPost = response.body;
      expect(updatedPost.title).to.equal(requestBody.title);
      expect(updatedPost.body).to.equal(requestBody.body);
      expect(updatedPost.userId).to.equal(requestBody.userId);
    });

  });

  it('should failed update post ', () => {
    cy.api({
      method: 'PUT',
      url: `${Cypress.env("API_URL")}/posts/${postID2}`,
      failOnStatusCode: false,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: requestBody2
    }).as("updatePost");

    cy.get("@updatePost").its("status").should("eq", statusError);

  });

})
