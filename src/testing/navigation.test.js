import React from "react";
import * as rtl from "@testing-library/react";
// import MemoryRouter which allows us to render and navigate (cant use history prop)
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
// import of our navigation component
import Navigation from "../components/Navigation";

// testing to check if navigation renders important links
it("renders the text of navigation links", () => {
  // create a render wrapper (renders the component you are testing)
  const wrapper = rtl.render(<Navigation />, { wrapper: MemoryRouter });
  // variable that checks if hello world exists
  // queryByText is a function built into the testing library
  // /hello world/i is a Regex or regular expression
  // it checks if that text exists and the i means case insensitive
  const home = wrapper.queryByText(/home/i);
  const search = wrapper.queryByText(/search/i);
  const account = wrapper.queryByText(/account/i);
  const notifications = wrapper.queryByText(/notifications/i);

  // now use expect to delcare what we EXPECT to happen
  expect(search && home && account && notifications).toBeInTheDocument();
  expect(search && home && account && notifications).toBeTruthy();
});
