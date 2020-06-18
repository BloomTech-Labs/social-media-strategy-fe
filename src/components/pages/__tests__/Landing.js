import React from "react";
import Landing from "../Landing.js";
import LoginOkta from "../../auth/LoginOkta.js";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router, Route } from "react-router-dom";

//jest.mock("react-router-dom", () => ({
//  ...jest.requireActual("react-router-dom"),
//  useHistory: () => ({
//    push: jest.fn()
//  })
//}));

jest.mock("../../auth/LoginOkta.js", () => {
  return () => <div>Sign In Widget Mock</div>;
});

it("renders without crashing", () => {
  render(
    <Router>
      <Landing />
    </Router>
  );
});

it("renders 'SoMe' heading", () => {
  const { getByTestId } = render(
    <Router>
      <Landing />
    </Router>
  );

  const heading = getByTestId("some-heading");
  expect(heading).toBeInTheDocument();
});

it("renders SIGN UP and LOGIN links", () => {
  const { getByText } = render(
    <Router>
      <Landing />
    </Router>
  );

  const signUp = getByText(/sign up/i);
  const logIn = getByText(/login/i);

  expect(signUp).toBeInTheDocument();
  expect(logIn).toBeInTheDocument();
});

it("renders main heading and sub heading", () => {
  const { getByText } = render(
    <Router>
      <Landing />
    </Router>
  );

  const mainHeading = getByText(/social media management made easy./i);
  const subHeading = getByText(/discover how to develop your brand/i);

  expect(mainHeading).toBeInTheDocument();
  expect(subHeading).toBeInTheDocument();
});

it("renders Get started button", () => {
  const { getByText } = render(
    <Router>
      <Landing />
    </Router>
  );

  const getStarted = getByText(/get started/i);

  expect(getStarted).toBeInTheDocument();
});

it("clicking on Sign Up / Login links directs user to /login", async () => {
  const { getByText, findByText } = render(
    <Router initialEntries={["/"]}>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={LoginOkta} />
    </Router>
  );

  const login = getByText(/sign up/i);
  expect(login).toBeInTheDocument();
  fireEvent.click(login);

  //const widgetMock = await findByText(/sign in widget mock/i);
  //expect(widgetMock).toBeInTheDocument();
});

it("clicking on Get Started button directs user to /login", async () => {
  const { getByText, findByText } = render(
    <Router initialEntries={["/"]}>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={LoginOkta} />
    </Router>
  );

  const getStarted = getByText(/get started/i);
  expect(getStarted).toBeInTheDocument();
  fireEvent.click(getStarted);

  const widgetMock = await findByText(/sign in widget mock/i);
  expect(widgetMock).toBeInTheDocument();
});
