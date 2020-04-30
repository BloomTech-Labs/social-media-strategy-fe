describe('visits the soMe landing page', function() {
  it('opens the some app in the browser', function() {
    cy.visit('/');
  });
  it('contains the SoMe logo', function() {
    cy.get('[data-cy=landing-logo]');
  });
  it('contains a link to signup that takes you to the login page', function() {
    cy.get('[data-cy=login-nav]').should('have.attr', 'href', '/login');
  });
  it('contains a link to register that takes to you the register page', function() {
    cy.get('[data-cy=register-nav]').should('have.attr', 'href', '/register');
  });
  it('contains text describing the applicatoin and provides a call-to-action button', function() {
    cy.get('[data-cy=main-text]');
    cy.get('[data-cy=secondary-text]');
    cy.get('[data-cy=call-to-action-button]').should(
      'have.attr',
      'href',
      '/register'
    );
  });
  it('contains a sub navigation that renders copyright text', function() {
    cy.get('[data-cy=copyright]');
    cy.contains('®');
  });
  it('contains a link to team that takes you to the team page', function() {
    cy.get('[data-cy=team]').should('have.attr', 'href', '/team');
  });
  it('contains a link to the SoMe github page and brings you to the github repo', function() {
    cy.get('[data-cy=github]').should(
      'have.attr',
      'href',
      'https://github.com/Lambda-School-Labs/social-media-strategy-fe'
    );
  });
  it('contains a link to lambda school and brings you to the lambda school website', function() {
    cy.get('[data-cy=lambda-school]').should(
      'have.attr',
      'href',
      'https://lambdaschool.com/'
    );
  });
});
