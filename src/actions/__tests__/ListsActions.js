import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../listsActions.js";
import * as types from "../kanbanActionTypes.js";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  user: {
    initialized: true,
    okta_uid: null,
    email: null,
    twitter_handle: "some_test"
  },
  lists: null
};

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
  test("loadListsFromDb should get the lists for the logged in user and dispatch UPDATE_LISTS action with payload set to the lists", async () => {
    const store = mockStore({
      user: {
        initialized: true,
        okta_uid: null,
        email: null,
        twitter_handle: "some_test"
      },
      lists: null
    });

    let dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual([]);

    await store.dispatch(actions.loadListsFromDb("blah"));

    const expectedActions = [
      {
        type: types.UPDATE_LISTS,
        payload: {
          "fc85a964-eec3-42eb-a076-4d7d2634b321": {
            id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
            okta_uid: "00ucj17sgcvh8Axqr4x6",
            created_at: "2020-06-08 12:51:13.821025-07",
            index: 0,
            title: "list 1",
            posts: [
              {
                created_at: "2020-06-10 13:39:52.872039-07",
                id: "634b0e5c-af78-425b-8ad6-4622986e2e0f",
                index: 0,
                list_id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
                okta_uid: "00ucj17sgcvh8Axqr4x6",
                post_text: "foo",
                posted: false
              },
              {
                created_at: "2020-06-10 13:39:58.525309-07",
                id: "b46052ea-ba9b-48c7-8f31-3c4d9930b596",
                index: 1,
                list_id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
                okta_uid: "00ucj17sgcvh8Axqr4x6",
                post_text: "bar",
                posted: false
              },
              {
                created_at: "2020-06-10 13:40:02.380562-07",
                id: "a7112c6c-75e9-4a84-aa44-357d0d90ff32",
                index: 2,
                list_id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
                okta_uid: "00ucj17sgcvh8Axqr4x6",
                post_text: "baz",
                posted: false
              }
            ]
          },
          "d2b3833d-08b3-4dd8-96fe-822e3a608d82": {
            id: "d2b3833d-08b3-4dd8-96fe-822e3a608d82",
            okta_uid: "00ucj17sgcvh8Axqr4x6",
            created_at: "2020-06-08 12:51:21.129036-07",
            index: 1,
            title: "list 2",
            posts: [
              {
                created_at: "2020-06-10 13:40:31.648547-07",
                id: "a2399166-caa5-497f-934d-2cad58c4e639",
                index: 0,
                list_id: "d2b3833d-08b3-4dd8-96fe-822e3a608d82",
                okta_uid: "00ucj17sgcvh8Axqr4x6",
                post_text: "hello",
                posted: false
              },
              {
                created_at: "2020-06-10 13:40:36.284236-07",
                id: "c6bed674-29e9-4302-800d-7c371fcee539",
                index: 1,
                list_id: "d2b3833d-08b3-4dd8-96fe-822e3a608d82",
                okta_uid: "00ucj17sgcvh8Axqr4x6",
                post_text: "world",
                posted: false
              }
            ]
          }
        }
      }
    ];

    dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
