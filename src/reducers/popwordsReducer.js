import {GET_WORDS, UPDATE_WORDS} from '../actions/popwordsActions';

const initialState = {};

const popwordsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_WORDS:
            return {
                ...state,
            };
        case UPDATE_WORDS:
            return action.payload;
            default:
            return state;
    }
};

export default popwordsReducer;