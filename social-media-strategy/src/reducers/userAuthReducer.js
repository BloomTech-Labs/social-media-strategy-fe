import { USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_START,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE } from '../actions'

export const userAuthReducer = (state, action) => {
    switch(action.type) {
        case USER_LOGIN_START:
            return {
                ...state,
                isLoading: true,
                isLoggedIn: false,
                error: null
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                error: null
            }
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }
        case USER_REGISTER_START:
            return {
                ...state,
                isLoading: true,
                isLoggedIn: false,
                error: null
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                error: null
            }
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: action.payload
            }
        default:
            return state;
    }

}