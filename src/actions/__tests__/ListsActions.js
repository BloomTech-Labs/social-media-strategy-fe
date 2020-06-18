import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../listsActions.js";
import * as types from "../kanbanActionTypes.js";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("listsActions", () => {});
