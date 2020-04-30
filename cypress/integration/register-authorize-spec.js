describe('tests the register page', function() {
  it('visits the registration page', function() {
    cy.visit('/register');
  });

  it('greets with sign up to SoMe', () => {
    cy.contains('Sign Up to SoMe');
  });

  it('prompts you to create an account', () => {
    cy.contains('Create Account');
  });

  it('allows a user to access login if they already have an account', function() {
    cy.get('[data-cy=register-to-login]').should('have.attr', 'href', '/login');
  });

  it('allows the user to click the SoMe copyright link and takes you to the team page', function() {
    cy.get('[data-cy=register-copyright]').should('have.attr', 'href', '/team');
  });

  it('provides an email and password, then logs in', function() {
    cy.get('[data-cy=email]')
      .click()
      .type('cypressTest@cypress.com');
    cy.get('[data-cy=password]')
      .click()
      .type('cypress');
    cy.get('[data-cy=submit]').click();
  });
});
