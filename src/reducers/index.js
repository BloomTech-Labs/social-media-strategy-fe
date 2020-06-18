import { combineReducers } from "redux";

import kanbanReducer from "./kanbanReducer";
import userReducer from "./userReducer";
import statsReducer from "./statsReducer";
import popwordsReducer from "./popwordsReducer";

export const reducer = combineReducers({
	user: userReducer,
	kanban: kanbanReducer,
	stats: statsReducer,
	popWords: popwordsReducer,
});
