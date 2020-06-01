import { v4 as uuid } from 'uuid';
import lists from './dummyListsPosts';
import {
    SET_USER
} from '../actions/types';

const initialState = {
    okta_uid: '',
    twitter_handle: '',
    email: ''
};

const userReducer = (state=initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case SET_USER: 
            return {
                ...payload
            };
        default:
            return state;
    }
}

export default userReducer;