import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "../userActionTypes.js";
//import * as actions from "../userActions.js";
import { initializeUser } from "../userActions.js";

// Understand

// Inputs
// - authService (Okta authentication library)
// - history (object from useHistory() react-router's useHistory hook)

// Output
// A Thunk that:
// - Uses authService to get the user's Okta profile data
// - Checks if the user is authenticated
//   If not, returns
// - Checks if the user has a twitter_handle
//   If not, calls history.push("/connect/twitter");
//  dispatches an action with:
//  type: INITIALIZE_USER
//  payload: {
//    initialized: true,
//    okta_uid: sub,
//    email,
//    twitter_handle
//  }

// Plan

// Mocks:
// - authService
// - history
// - store

// Test cases:
// - User is not authenticated

// - User is authenticated:
// - User does not have a twitter profile
// - User has a twitter profile
// - Correct action was dispatched

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("userActions", () => {
  it("returns undefined if the user is not authenticated", async () => {
    const mockHistory = [];
    const mockAuthService = {
      getUser: () => ({ twitter_handle: "SoMe_Strategy" }),
      getAuthState: () => ({ isAuthenticated: false })
    };

    const result = await initializeUser(mockAuthService, mockHistory)();

    expect(result).toBe(undefined);
  });

  it("directs the user to /connect/twitter if twitter_handle is undefined", async () => {
    const mockHistory = [];
    const mockAuthService = {
      getUser: () => ({ twitter_handle: null }),
      getAuthState: () => ({ isAuthenticated: true })
    };

    const mockDispatch = obj => obj;

    await initializeUser(mockAuthService, mockHistory)(mockDispatch);

    expect(mockHistory).toContain("/connect/twitter");
  });

  it("dispatches INITIALIZE_USER action if user is authenticated and connected their twitter account", async () => {
    const store = mockStore({
      user: {
        initialized: false,
        okta_uid: null,
        email: null,
        twitter_handle: "some_test"
      }
    });

    const mockHistory = [];
    const mockAuthService = {
      getUser: () => ({
        sub: null,
        email: null,
        twitter_handle: "some_test"
      }),
      getAuthState: () => ({ isAuthenticated: true })
    };

    let actions = store.getActions();
    expect(actions).toEqual([]);

    await store.dispatch(initializeUser(mockAuthService, mockHistory));

    const expectedActions = [
      {
        type: types.INITIALIZE_USER,
        payload: {
          initialized: true,
          okta_uid: null,
          email: null,
          twitter_handle: "some_test"
        }
      }
    ];

    actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
