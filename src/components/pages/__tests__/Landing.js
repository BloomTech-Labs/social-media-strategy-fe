import React from "react";
import Landing from "../Landing.js";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

//jest.mock("react-router-dom", () => ({
//  ...jest.requireActual("react-router-dom"),
//  useHistory: () => ({
//    push: jest.fn()
//  })
//}));

it("renders without crashing", () => {
  render(
    <Router>
      <Landing />
    </Router>
  );
});

it("renders 'SoMe' heading", () => {
  const { getByText } = render(
    <Router>
      <Landing />
    </Router>
  );

  const heading = getByText(/some/i);
  expect(heading).toBeInTheDocument();
});
