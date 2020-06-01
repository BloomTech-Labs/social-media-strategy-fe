import { combineReducers } from "redux";
import userReducer from "./user";
import kanbanReducer from './kanban';

export const reducer = combineReducers({
  user: userReducer,
  kanban: kanbanReducer
});
