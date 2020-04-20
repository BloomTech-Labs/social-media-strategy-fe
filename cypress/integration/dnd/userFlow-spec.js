// const url = Cypress.env("appUrl");

// describe("log into an existing account", function() {
//   it("visits the site, provides an email and password, then logs in", function() {
//     cy.visit("/login");
//     cy.get("#email")
//       .click()
//       .type("test@test.com");
//     cy.get("#password")
//       .click()
//       .type("test");
//     cy.get(".MuiButton-label").click();
//   });
// });

// describe("user adds a tweet topic", function() {
//   it("adds a topic named /cypress/ which should display to the right of drafts", function() {
//     cy.get(".closed-btn")
//       .first()
//       .click();
//     cy.get(".add-card-txt-area").type("cypress");
//     cy.get(".MuiButton-label")
//       .last()
//       .click();
//     cy.wait(500);
//   });
// });

// describe("user adds a card to newly created topic", function() {
//   it("adds a card named /testing with cypress/ which should display in the cypress topic", function() {
//     cy.get(".closed-btn")
//       .last()
//       .click();
//     cy.get(".add-card-txt-area").type("testing with cypress");
//     cy.get(".MuiButton-label")
//       .last()
//       .click();
//     cy.wait(1000);
//   });
// });

// ! test currently does not work when edit button submits due to refresh and change of route

// describe("user edits the card they created", function() {
//   it("edits the cypress card to say /editing with cypress/", function() {
//     cy.get(".edit")
//       .first()
//       .click();
//     cy.get("textarea")
//       .first()
//       .click()
//       .type("edit testing with cypress");
//     cy.get("input").click();
//   });
// });

// describe("user deletes the card they created and edited", function() {
//   it("deletes the cypress card to say /edit testing with cypress/", function() {
//     cy.get(".delete")
//       .last()
//       .click();
//   });
// });

// ! test currently does not work when delete button is clicked. the event fires but nothing happens

// describe("user edits the card they created", function() {
//   it("edits the cypress card to say /editing with cypress/", function() {
//     cy.get(".deleteTopic")
//       .last()
//       .click();
//     cy.reload();
//   });
// });

// describe("user logs out of their account", function() {
//   it("logs out of the account and returns to the home screen for log in", function() {
//     cy.get(".link")
//       .last()
//       .click();
//   });
// });
