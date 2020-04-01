import { combineReducers } from "redux";
import topicsReducer from './topicsReducer';


export const reducer = combineReducers({
  topics: topicsReducer
});
