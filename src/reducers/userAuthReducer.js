import CONSTANTS from "../actions/constants";

export const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.USER_APICALL_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CONSTANTS.USER_APICALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentUser: action.currentUser ?? state.currentUser,
      };
    case CONSTANTS.USER_APICALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CONSTANTS.TOPIC_FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CONSTANTS.TOPIC_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case CONSTANTS.TOPIC_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userAuthReducer;
