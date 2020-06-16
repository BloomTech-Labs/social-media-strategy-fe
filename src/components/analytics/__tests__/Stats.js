import React from "react";
import { render } from "@testing-library/react";
import Stats from "../../analytics/Stats";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// Understand

// Question: What does the user expect in the Stats component?
// Expect to see Followers, Retweets, Likes, and engagement ratio

// Question: Which dependencies do we have to mock?
// Mock store

// Plan
// We need to wrap stats in MUI provider
// import redux-mock-store and mock the store
// import thunk

const initialState = {
  user: { twitter_handle: "dutchbros" },
  stats: {
    num_followers: "",
    num_retweets: "",
    num_favorites: "",
    engagement_ratio: "",
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);
describe("stats component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Stats />
      </Provider>
    );
  });
  it("shows all stats data from user", () => {
      const { getByText } = render(
      <Provider store={store}>
        <Stats />
      </Provider>
    );
      const followers = getByText(/followers/i);
      const retweets = getByText(/retweets/i);
      const likes = getByText(/likes/i);
      const engagement = getByText(/engagement/i);

      expect(followers).toBeInTheDocument();
      expect(retweets).toBeInTheDocument();
      expect(likes).toBeInTheDocument();
      expect(engagement).toBeInTheDocument();
  });
});
