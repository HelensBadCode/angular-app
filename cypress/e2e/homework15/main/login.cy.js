describe("Test log in", () =>{
  const pageURL = "auth/login";

  it('should positive test log in', () => {
    cy.visit(pageURL);

    const userData ={
      email : "lena111@@gmail.com",
      password : 'Qwerty123',
      rememberMe: true
    }

    cy.login(userData);
    cy.get('nb-card-body button[status="primary"]').click();
    cy.url({ timeout: 10000 }).should('include', 'pages/dashboard');
  });
});
