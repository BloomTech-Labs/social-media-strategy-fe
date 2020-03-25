import { axiosWithAuth } from "../utils/axiosWithAuth";

export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_REGISTER_START = "USER_REGISTER_START";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const DRAG_HAPPENED = "DRAG_HAPPENED";

export const registerUser = userData => dispatch => {
  dispatch({ type: USER_REGISTER_START });
  axiosWithAuth()
    .post("/auth/register", userData)
    .then(response => {
      dispatch({ type: USER_REGISTER_SUCCESS });
      localStorage.setItem("token", response.data.payload);
    })
    .catch(error => {
      dispatch({ type: USER_REGISTER_FAILURE, payload: error.data });
      console.log("Error", error);
    });
};

export const login = userData => dispatch => {
  dispatch({ type: USER_LOGIN_START });
  axiosWithAuth()
    .post("/auth/login", userData)
    .then(response => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: userData.username });
      localStorage.setItem("token", response.data.token);
    })
    .catch(error => {
      dispatch({ type: USER_LOGIN_FAILURE, payload: error.data });
      console.log("Error", error);
    });
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => dispatch => {
  return dispatch({
    type: DRAG_HAPPENED,
    payload: droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
  });
};
