import React from "react";
import { render, wait } from "@testing-library/react";
import TwitterConnect from "../TwitterConnect";

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => ({
    authState: {},
    authService: {
      logout: jest.fn(),
      getUser: () => ({ twitter_handle: "SoMe_Strategy" }),
    },
  }),
}));

describe("TwitterConnect.js", () => {
  it("renders without crashing", async () => {
    await wait(() => render(<TwitterConnect />));
  });
});
