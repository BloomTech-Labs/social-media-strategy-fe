import {GET_DATA, UPDATE_DATA} from '../actions/popwordsActions';

const initialState = { 
    topics: {},
};

const popwordsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DATA:
            return {
                ...state,
            };
        case UPDATE_DATA:
            return action.payload;
            default:
            return state;
    }
};

export default popwordsReducer;