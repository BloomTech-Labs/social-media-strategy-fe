// import { axiosWithAuth } from "../utils/axiosWithAuth";

import {
  INITIALIZE_USER,
  // AUTHORIZE_TWITTER,
  // DISCONNECT_TWITTER,
} from "./userActionTypes";

export const initializeUser = (authService, history) => async (dispatch) => {
  if (!authService.getAuthState().isAuthenticated) return;
  const user = await authService.getUser();
  const { sub, email, twitter_handle } = user;
  if (!twitter_handle) history.push("/connect/twitter");

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
