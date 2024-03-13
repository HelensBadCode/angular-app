describe('Stepper page', () => {
  before(() => {
    cy.visit('/pages/layout/stepper');

  });
  it('Should check the text inside the component', () => {
    const containerSelector = 'nb-stepper[orientation="horizontal"]';
    const title = `${containerSelector} h3`;
    const prevBtn = `${containerSelector} button:contains('prev')`;
    const nextBtn = `${containerSelector} button:contains('next')`;
    const steps = 4;

    for (let i = 1; i <= steps; i++) {
      cy.get(title).should("have.text", `Step content #${i}`);
      if (i > 1) {
        cy.get(prevBtn).should("be.enabled");
      } else {
        cy.get(prevBtn).should("be.disabled");
      }
      if (i < steps) {
        cy.get(nextBtn).should("be.enabled").click();
      } else {
        cy.get(nextBtn).should("be.disabled");
      }
    }

  });
});
