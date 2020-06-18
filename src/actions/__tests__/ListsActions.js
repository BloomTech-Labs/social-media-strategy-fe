import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../listsActions.js";
import * as types from "../kanbanActionTypes.js";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../utils/axiosWithAuth");

describe("listsActions", () => {
  // Understand
  // listListsFromDb

  // Input:
  // - userId

  // Output:
  // - A thunk that takes in 'dispatch' as an arg and:
  //   - Gets the user's lists from the BE
  //   - Sorts by the lists by index
  //   - Gets the posts attached to the list and adds it to each list
  //   - Converts the lists into an objext
  //   - dispatches an action {
  //     type: UPDATE_LISTS,
  //     payload: listsObj
  //   }
  test("loadListsFromDb should get the lists for the logged in user and update the store", async () => {
    const store = mockStore({
      user: {},
      lists: {}
    });

    store.dispatch(actions.loadListsFromDb("blah"));
  });
});
