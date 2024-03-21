import brands from  '../../fixtures/brands.json'

describe('Intercept', () => {
  before(()=>{
    cy.visit('https://qauto.forstudy.space/');
  });

  it('should intercept request', () => {
    cy.intercept('https://qauto.forstudy.space/api/cars/brands').as('getBrands');

    cy.get(".header-link.-guest").click();

    cy.url().should('contain', '/panel/garage');
    cy.get('.btn-primary').click();

    cy.get('@getBrands').its('response.body').then((v)=> console.log(v));
  })

  it('should mock response', () => {
    cy.intercept('GET','https://qauto.forstudy.space/api/cars/brands', brands);

    cy.get(".header-link.-guest").click();

    cy.url({timeout: 6000}).should('contain', '/panel/garage');

    cy.get('.btn-primary').click()
  })

  it.only('should mock response with plagin', () => {
    cy.get(".header-link.-guest").click();

    cy.url({timeout: 6000}).should('contain', '/panel/garage');

    cy.intercept('GET','https://qauto.forstudy.space/api/cars/brands', brands);

    cy.get('.btn-primary').matchImageSnapshot("addCarButton");
    cy.get('.btn-primary').click();

  })
})
