// describe('it tests the functionality of the navigation', function() {
//   it('allows you to login with valid credentials', () => {
//     cy.visit('/login');
//     cy.get('[data-cy=email]').type('test@test.com');
//     cy.get('[data-cy=password]').type('test');
//     cy.get('[data-cy=submit]').click();
//     cy.wait(300);
//     cy.location('pathname').should('eq', '/home/accounts');
//   });

//   it('contains the main navigation links', function() {
//     cy.contains('Home');
//     cy.contains('Feed');
//     cy.contains('Queue');
//     cy.contains('Logout');
//   });

//   it('tests if the default acitive class is equal to home', function() {
//     cy.get('[data-cy=nav-home-active]').should('have.class', 'linkActive');
//     cy.get('[data-cy=nav-queue-active]').not('have.class', 'linkActive');
//   });

  // it('changes active class when opening a differnt link in navigation', function() {
  //   cy.get('[data-cy=nav-queue]').click();
  //   cy.get('[data-cy=nav-queue-active]').should('have.class', 'linkActive');
  // });
});
