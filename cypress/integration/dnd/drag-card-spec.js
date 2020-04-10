describe("testing drag feature", function() {
  it("takes a card and places in a new topic", function() {
    cy.visit("http://localhost:3000/home");
    function movePiece(x, y) {
      cy.get(".sc-AxjAm.pHAFq")
        .first()
        .trigger("mousedown", { button: 0 })
        .wait(1500)
        .trigger(
          "mousemove",
          { clientX: 1032, clientY: 750 },
          { screenX: 1032, screenY: 750 },
          { pageX: 1032, pageY: 857 }
        )
        .trigger("mouseup", { force: true });
    }
    movePiece(1037, 750);
  });
});
