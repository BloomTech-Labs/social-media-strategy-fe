import {GET_DATA, UPDATE_DATA} from '../actions/statsActions';

const initialState = { 
    num_followers: '',
    num_retweets: '',
    num_favorites: '',
    engagement_ratio: '',
};

const statsReducer = (state = initialState, action) => {
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

export default statsReducer;