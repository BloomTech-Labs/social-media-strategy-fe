import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postsReducer from './posts';

export const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer
});
