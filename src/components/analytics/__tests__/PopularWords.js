import React from "react";
import PopularWords from "../PopularWords.js";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const initialState = {
  user: {
    initialized: true,
    okta_uid: null,
    email: null,
    twitter_handle: "dutchbros"
  },
  stats: {
    num_followers: "",
    num_retweets: "",
    num_favorites: "",
    engagement_ratio: ""
  },
  popWords: {
    statusLoaded: false,
    processing: false,
    modelReady: false,
    queued: false,
    error: "",
    topics: []
  }
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

//Understand
//Question: What does the user expect to see in the Popular Words component?

//PLAN: mock a response, test different states depending on responses
describe("PopularWords component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <PopularWords />
      </Provider>
    );
  });
});
