import {
  USER_APICALL_START,
  USER_APICALL_SUCCESS,
  USER_APICALL_FAILURE,
} from "../actions";

export const initialState = {
  twitterAccountInformation: {
    firstName: "Asami",
    lastName: "Arata",
    twitterHandle: "@AsamiArata",
    location: "San Francisco Bay Area",
    posts: 451,
    following: 250,
    followers: 2.6,
  },
  currentUser: "",
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_APICALL_START:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        error: null,
      };
    case USER_APICALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        currentUser: action.currentUser,
      };
    case USER_APICALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userAuthReducer;
