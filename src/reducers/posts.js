import { v4 as uuid } from 'uuid';
import lists from './dummyListsPosts';
import { UPDATE_LISTS } from '../actions/types';

const initialState = {
    lists
};

const postsReducer = (state=initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case UPDATE_LISTS: 
            return {
                ...state,
                lists: payload
            };
        default:
            return state;
    }
}

export default postsReducer;