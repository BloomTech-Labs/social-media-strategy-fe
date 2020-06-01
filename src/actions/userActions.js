import { axiosWithAuth } from "../utils/axiosWithAuth";

import {
  INITIALIZE_USER,
  UPDATE_USER,
  AUTHORIZE_TWITTER,
  DISCONNECT_TWITTER,
} from "./userActionTypes";

export const initializeUser = (authService, history) => async (dispatch) => {
  const user = await authService.getUser();
  if (!authService.getAuthState().isAuthenticated) return;
  const { sub, email, twitter_handle } = user;
  if (!twitter_handle) history.push("/connect/twitter");
  axiosWithAuth(authService).put(`users`);

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

export const updateUser = (authService) => async (dispatch) => {
  const user = await authService.getUser();
  if (!authService.getAuthState().isAuthenticated) return;
  const { sub, email, twitter_handle } = user;
  axiosWithAuth(authService).put(`users`);

  dispatch({
    type: UPDATE_USER,
    payload: {
      okta_uid: sub,
      email,
      twitter_handle,
    },
  });
};

export const authorizeTwitter = (authService) => (dispatch) => {
  axiosWithAuth(authService)
    .get("/auth/twitter/authorize")
    .then(({ data }) => (window.location.href = data))
    .catch((err) => console.error(err));
};

export const authorizeTwitterCallback = (
  authService,
  history,
  oauth_token,
  oauth_verifier
) => (dispatch) => {
  axiosWithAuth(authService)
    .post("/auth/twitter/callback", {
      oauth_token,
      oauth_verifier,
    })
    .then((res) => {
      dispatch(updateUser(authService));
      history.push("/home");
    })
    .catch((err) => {
      console.error(err);
      history.push("/connect/twitter");
    });
};
