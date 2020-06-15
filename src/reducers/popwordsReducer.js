import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE} from '../actions/popwordsActions';

const initialState = {
    loading: false,
    success: false,
    topics: [],
};

const popwordsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEARCH_FAILURE:
            return {
                loading: false,
                success: false,
                topics: [],
            };
        case SEARCH_SUCCESS: 
            {
            console.log("payload!!!", action.payload.topics);
            const topics = Object.values(action.payload.topics).map(topic => topic);
            return {
                loading: false,
                success: action.payload.success,
                topics: topics,
            };
        }
            default:
            return state;
    }
};



export default popwordsReducer;