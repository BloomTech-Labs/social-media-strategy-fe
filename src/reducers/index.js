import { combineReducers } from "redux";

import kanbanReducer from './kanban';
import listsReducer from "./listsReducer";
import userReducer from "./userReducer";


export const reducer = combineReducers({
  lists: listsReducer,
  user: userReducer,
  kanban: kanbanReducer
});
