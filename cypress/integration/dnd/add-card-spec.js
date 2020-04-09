describe("testing add a card", function() {
  it("adds a new card", function() {
    cy.visit("http://localhost:3000/home");
    cy.get(".actionOpener")
      .last()
      .click()
      .type("this is a test from cypress")
      .get(".actionSubmit")
      .first()
      .click();
  });
});
