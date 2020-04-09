import "@4tw/cypress-drag-drop";

describe("Dragtest", () => {
  it("should dragndrop", () => {
    cy.visit("http://localhost:3000/home");

    cy.get(".sc-AxjAm.pHAFq.card-0").drag(".topic-1", {
      force: true
    });
  });
});

// describe("testing drag feature", function() {
//   it("takes a card and places in a new topic", function() {
//     const dataTransfer = new DndSimulatorDataTransfer();
//     cy.visit("http://localhost:3000/home");

//     cy.get(".sc-AxjAm.pHAFq.card-0")
//       .trigger("mousedown", { which: 1 })
//       .trigger("dragstart", { dataTransfer })
//       .trigger("drag", {});

//     cy.get(".sc-AxjAm.pHAFq.card-3")
//       .trigger("dragover", { dataTransfer })
//       .trigger("drop", { dataTransfer })
//       .trigger("dragend", { dataTransfer })
//       .trigger("mouseup", { which: 1 });

//     function DndSimulatorDataTransfer() {
//       this.data = {};
//     }

//     DndSimulatorDataTransfer.prototype.dropEffect = "move";
//     DndSimulatorDataTransfer.prototype.effectAllowed = "all";
//     DndSimulatorDataTransfer.prototype.files = [];
//     DndSimulatorDataTransfer.prototype.items = [];
//     DndSimulatorDataTransfer.prototype.types = [];

//     DndSimulatorDataTransfer.prototype.clearData = function(format) {
//       if (format) {
//         delete this.data[format];

//         const index = this.types.indexOf(format);
//         delete this.types[index];
//         delete this.data[index];
//       } else {
//         this.data = {};
//       }
//     };

//     DndSimulatorDataTransfer.prototype.setData = function(format, data) {
//       this.data[format] = data;
//       this.items.push(data);
//       this.types.push(format);
//     };

//     DndSimulatorDataTransfer.prototype.getData = function(format) {
//       if (format in this.data) {
//         return this.data[format];
//       }

//       return "";
//     };

//     DndSimulatorDataTransfer.prototype.setDragImage = function(
//       img,
//       xOffset,
//       yOffset
//     ) {
//       // since simulation doesn"t replicate the visual
//       // effects, there is no point in implementing this
//     };
//   });
// });
