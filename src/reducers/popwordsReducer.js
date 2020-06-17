import {
	UPDATE_STATUS,
	SET_TOPICS,
	ERROR,
} from "../actions/popwordsActionTypes";

const initialState = {
	statusLoaded: false,
	processing: false,
	modelReady: false,
	queued: false,
	error: "",
	topics: [],
};

const popwordsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_STATUS:
			return {
				...state,
				statusLoaded: true,
				queued: action.payload.queued,
				processing: action.payload.processing,
				modelReady: action.payload.model_ready,
			};
		case SET_TOPICS:
			return {
				...state,
				topics: action.payload,
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default popwordsReducer;
