import { combineReducers } from "redux";
import topicsReducer from './topicsReducer';
import userAuthReducer from './userAuthReducer';

export const reducer = combineReducers({
  topics: topicsReducer,
  user: userAuthReducer
});
