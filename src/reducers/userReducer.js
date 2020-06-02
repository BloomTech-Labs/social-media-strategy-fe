import { INITIALIZE_USER } from "../actions/userActionTypes";

const initialState = {
  initialized: false,
  okta_uid: null,
  email: null,
  twitter_handle: null,
};

const userReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case INITIALIZE_USER:
      for (let key in action.payload) {
        newState[key] = action.payload[key];
      }
      break;
    default:
      break;
  }
  return newState;
};

export default userReducer;
