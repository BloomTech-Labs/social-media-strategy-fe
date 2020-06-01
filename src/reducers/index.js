import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import userReducer from "./userReducer";

export const reducer = combineReducers({
  lists: listsReducer,
  user: userReducer,
});
