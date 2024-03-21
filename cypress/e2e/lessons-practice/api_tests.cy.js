describe('Test get post by id', {
  env: {
    API_URL: "https://jsonplaceholder.typicode.com/"
  }
} ,()=>{

  it('should return post by id ', () => {
    cy.request(`${Cypress.env("API_URL")}/posts/1`).its("body.id").should("eq", 1);

  });

  it('should return posts list ', () => {
    cy.request(`${Cypress.env("API_URL")}/posts`);

  });

  it('should return posts list with Bahmutov plagin', () => {
    cy.api(
      {
        url: `${Cypress.env("API_URL")}/posts`
      }
    );//change

  });

  it('should create new post with Bahmutov plagin', () => {
    const requestBody = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    }
    cy.api({
      method: 'POST',
      url: `${Cypress.env("API_URL")}/posts`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: requestBody
    }).its('body').should('contain', requestBody);

  });

  it('should create new post ', () => {
    const requestBody = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    }
    cy.request({
      method: 'POST',
      url: `${Cypress.env("API_URL")}/posts`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: requestBody
    }).its('body').should('contain', requestBody);

  });

})

