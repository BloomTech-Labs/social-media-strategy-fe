import { axiosWithAuth } from "../utils/axiosWithAuth";

import {
  INITIALIZE_USER,
  AUTHORIZE_TWITTER,
  DEAUTHORIZE_TWITTER,
} from "./userActionTypes";

export const initializeUser = (authService) => async (dispatch) => {
  axiosWithAuth(authService).put(`users`);
  const { sub, email, twitter_handle } = await authService.getUser();

  dispatch({
    type: INITIALIZE_USER,
    payload: {
      initialized: true,
      okta_uid: sub,
      email,
      twitter_handle,
    },
  });
};

export const authorizeTwitter = () => (dispatch) => {};
