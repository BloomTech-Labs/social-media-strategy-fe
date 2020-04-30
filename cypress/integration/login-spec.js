describe('tests login page', function() {
  it('visits the login page', function() {
    cy.visit('/login');
  });

  it('renders the login image', () => {
    cy.get('[data-cy=loginImage]').should('be.visible');
  });

  it('renders the lock image above sign up', function() {
    cy.get('[data-cy=lock-icon]').should('be.visible');
  });

  it('greets with log in to so me', () => {
    cy.contains('h1', 'Login to SoMe');
  });

  it('prompts you to sign into your account', () => {
    cy.contains('Sign into your account');
  });

  it('allows you to access the registration component', () => {
    cy.get('[data-cy=registerButton]')
      .contains('Sign Up')
      .should('have.attr', 'href', '/register');
  });

  it('renders a copyright for SoMe and links to the team page', function() {
    cy.get('[data-cy=login-copyright]').should('have.attr', 'href', '/team');
  });

  it('allows you to login with valid credentials', () => {
    cy.get('form').contains('Email Address');
    cy.get('[data-cy=email]').type('test@test.com');
    cy.get('[data-cy=password]').type('test');
    cy.get('[data-cy=submit]').click();
    cy.wait(300);
    cy.location('pathname').should('eq', '/home/accounts');
  });
});
