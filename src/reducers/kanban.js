import { v4 as uuid } from 'uuid';
import lists from './dummyListsPosts';
import {
    UPDATE_LISTS,
    ADD_LIST
} from '../actions/types';

const initialState = {
    // lists
    lists: null
};

const kanbanReducer = (state=initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case UPDATE_LISTS: 
            return {
                ...state,
                lists: payload
            };
        case ADD_LIST:
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [payload.id]: payload
                }
            }
        default:
            return state;
    }
}

export default kanbanReducer;