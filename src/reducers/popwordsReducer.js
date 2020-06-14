import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE} from '../actions/popwordsActions';

const initialState = {
    failure: '',
    loading: false,
    success: '',
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
                failure: action.payload,
            };
        case SEARCH_SUCCESS: 
            return {
                loading: false,
                success: action.payload,
            };    
            default:
            return state;
    }
};



export default popwordsReducer;