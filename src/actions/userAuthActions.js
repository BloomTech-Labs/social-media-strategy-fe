import { axiosWithAuth } from "../utils/axiosWithAuth";
import history from "../utils/history";
import Axios from "axios";

export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_REGISTER_START = "USER_REGISTER_START";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const login = (userData, cb, locationcb) => (dispatch) => {
  dispatch({ type: USER_LOGIN_START });

  Axios.post(
    "https://social-media-strategy.herokuapp.com/api/auth/login",
    userData
  )
    .then((response) => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: userData.email });
      localStorage.setItem("token", response.data.token);
      // history.push("/");
      cb("/");
      locationcb(true);
    })
    .catch((error) => {
      dispatch({ type: USER_LOGIN_FAILURE, payload: error.data });
    });
};

export const registerUser = (userData, cb, locationcb) => (dispatch) => {
  dispatch({ type: USER_REGISTER_START });
  Axios.post(
    "https://social-media-strategy.herokuapp.com/api/auth/register",
    userData
  )
    .then((response) => {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: userData.email });
      localStorage.setItem("token", response.data.payload);
      cb("/");
      locationcb(true);

      // history.push("/");
    })
    .catch((error) => {
      dispatch({ type: USER_REGISTER_FAILURE, payload: error.data });
      console.log("Error", error);
    });
};
