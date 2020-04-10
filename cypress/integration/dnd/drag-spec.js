import "@4tw/cypress-drag-drop";

describe("Dragtest", () => {
  it("should dragndrop", () => {
    cy.visit("http://localhost:3000/home");

    cy.get(".card-0").drag(".topic-1", {
      force: true
    });
  });
});
