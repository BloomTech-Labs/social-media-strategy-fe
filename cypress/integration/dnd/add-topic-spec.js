describe("testing add a new topic", function() {
  it("adds a new topic column", function() {
    cy.visit("http://localhost:3000/home");
    cy.get(".actionOpener")
      .first()
      .click()
      .type("Cypress")
      .get(".actionSubmit")
      .first()
      .click();
  });
});
