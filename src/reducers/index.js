import { combineReducers } from "redux";

import kanbanReducer from "./kanbanReducer";
import listsReducer from "./listsReducer";
import userReducer from "./userReducer";
import statsReducer from "./statsReducer";
import popwordsReducer from "./popwordsReducer";

export const reducer = combineReducers({
  lists: listsReducer,
  user: userReducer,
  kanban: kanbanReducer,
  stats: statsReducer,
  popWords: popwordsReducer,

});
