describe('Modal popup', () => {
  before(() => {
    cy.visit('/pages/modal-overlays/dialog');

    const enterNameBtn = '.result-from-dialog button';
    cy.get(enterNameBtn).should('be.visible').contains('Enter Name').click();
  });

  it('Should check the modal window and its components', () => {
    const dialogContainer= 'ngx-dialog-name-prompt';

    cy.get(`${dialogContainer} nb-card-header`).should('have.text', 'Enter your name');
    cy.get(`${dialogContainer} nb-card-body`).find('input[placeholder="Name"]').should('be.visible');
    cy.get(`${dialogContainer} nb-card-footer`).find('.cancel').should('be.enabled').and('have.text', 'Cancel');
    cy.get(`${dialogContainer} nb-card-footer`).find('.status-success').should('be.enabled').and('have.text', 'Submit');
  });
});

