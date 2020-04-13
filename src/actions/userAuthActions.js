import { axiosWithAuth } from "../utils/axiosWithAuth";
import Axios from "axios";

export const USER_APICALL_START = "USER_APICALL_START";
export const USER_APICALL_SUCCESS = "USER_APICALL_SUCCESS";
export const USER_APICALL_FAILURE = "USER_APICALL_FAILURE";

export const login = (userData, cb, locationcb) => (dispatch) => {
  dispatch({ type: USER_APICALL_START });

  Axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login` ||
      "https://social-media-strategy.herokuapp.com/api/auth/login",
    userData
  )
    .then((response) => {
      dispatch({ type: USER_APICALL_SUCCESS });
      localStorage.setItem("token", response.data.token);
      cb("/");
      locationcb(true);
    })
    .catch((error) => {
      dispatch({ type: USER_APICALL_FAILURE, payload: error.data });
    });
};

export const registerUser = (userData, cb, locationcb) => (dispatch) => {
  dispatch({ type: USER_APICALL_START });
  Axios.post(
    `${process.env.API_URL}/auth/register` ||
      "https://social-media-strategy.herokuapp.com/api/auth/register",
    userData
  )
    .then((response) => {
      dispatch({ type: USER_APICALL_SUCCESS });
      localStorage.setItem("token", response.data.payload);
      cb("/");
      locationcb(true);

      // history.push("/");
    })
    .catch((error) => {
      dispatch({ type: USER_APICALL_FAILURE, payload: error.data });
      console.log("Error", error);
    });
};
export const currentUser = () => (dispatch) => {
  dispatch({ type: USER_APICALL_START });

  axiosWithAuth()
    .get(`/users/user`)
    .then((response) => {
      dispatch({ type: USER_APICALL_SUCCESS, currentUser: response.data });
    })
    .catch((error) => {
      dispatch({ type: USER_APICALL_FAILURE, payload: error.data });
    });
};
