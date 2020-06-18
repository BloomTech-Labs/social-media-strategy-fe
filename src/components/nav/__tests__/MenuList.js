import React from "react";
import MenuList from "../MenuList";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import CreatePost from "../CreatePost";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import { createStore } from "redux";
import { Provider } from "react-redux";

jest.mock("@okta/okta-react/dist/OktaContext", () => ({
  useOktaAuth: () => ({
    authState: {},
    authService: {
      logout: jest.fn()
    }
  })
}));

jest.mock("../CreatePost.js", () => () => <div>CreatePost component</div>);

// Understand

// How is this component used by the user?
// - Clicking on the logo should redirect user to /home
// - Clicking on Media Manager should redirect user to /home
// - Clicking on Analytics should redirect user to /analytics
// - Clicking on Accounts should redirect user to /connect/twitter
// - Clicking on Log out should invoke the logout function

// What libraries do we have to mock?
// - useOktaAuth
// - useLocation and useHistory ??

it("renders navigation list", () => {
  // const component = shallow(<MenuList/>);

  const { getByText } = render(
    <Router>
      <MenuList />
    </Router>
  );

  const mediaManager = getByText(/media manager/i);
  expect(mediaManager).toBeInTheDocument();
});
