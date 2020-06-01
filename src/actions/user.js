import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SET_USER } from "./types";

export const setUser = (oktaUser) => async dispatch => {
    // create or update user in DB
    const { data } = await axiosWithAuth().put('/users', oktaUser);
    
    dispatch({
        type: SET_USER,
        payload: data
    });
}