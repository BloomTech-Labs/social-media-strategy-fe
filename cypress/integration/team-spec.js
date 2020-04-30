describe('renders the team page information', function() {
  it('visits the team page', function() {
    cy.visit('/team');
  });
  it('contains the SoMe logo and redirects to marketing page', function() {
    cy.get('[data-cy=teampage-logo]').should('have.attr', 'href', '/');
  });
  it('contains a link to signup that takes you to the login page', function() {
    cy.get('[data-cy=teampage-login]').should('have.attr', 'href', '/login');
  });
  it('contains a link to register that takes to you the register page', function() {
    cy.get('[data-cy=teampage-register]').should(
      'have.attr',
      'href',
      '/register'
    );
  });

  it('renders relevant project information (description, mission, vision)', function() {
    cy.get('[data-cy=teampage-info]');
    cy.get('[data-cy=teampage-mission]').contains('Mission');
    cy.get('[data-cy=teampage-vision]').contains('Vision');
  });

  it('contains link and image for github in the project information container', function() {
    cy.get('[data-cy=teampage-github]').should(
      'have.attr',
      'href',
      'https://github.com/Lambda-School-Labs/social-media-strategy-fe'
    );
    cy.get('[data-cy=teampage-github-image]')
      .should('be.visible')
      .should('have.attr', 'alt', 'github');
  });
  it('contains link and image for figma in the project information container', function() {
    cy.get('[data-cy=teampage-figma]').should(
      'have.attr',
      'href',
      'https://www.figma.com/file/ssdhBZL2Yr9GYaRyZtO8Cu/Social-Media-Strategy%2C-JP?node-id=179%3A0'
    );
    cy.get('[data-cy=teampage-figma-image]')
      .should('be.visible')
      .should('have.attr', 'alt', 'figma');
  });
  it('contains link and image for twitter in the project information container', function() {
    cy.get('[data-cy=teampage-twitter]').should(
      'have.attr',
      'href',
      'https://twitter.com/some_strategy'
    );
    cy.get('[data-cy=teampage-twitter-image]')
      .should('be.visible')
      .should('have.attr', 'alt', 'twitter');
  });
  it('renders information about the team leads', function() {
    cy.get('[data-cy=teamLead]').contains('Team Lead');
  });
  it('renders information about the ux designers', function() {
    cy.get('[data-cy=ux]').contains('UX');
  });
  it('renders information about the web developers', function() {
    cy.get('[data-cy=webDev]').contains('Web Devs');
  });
  it('renders information about the data science team', function() {
    cy.get('[data-cy=dataScience]').contains('Data Science');
  });
});
