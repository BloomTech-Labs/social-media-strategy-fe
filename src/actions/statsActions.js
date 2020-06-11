import axios from "axios";
import statsReducer from "../reducers/statsReducer";

export const GET_DATA = 'GET_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

export const getData = () => dispatch => {
    // dispatch({ type: GET_DATA });
    const body = { twitter_handle: "dutchbros"};
    axios
    .post("http://so-me-fastapi.eba-ghirpj73.us-east-1.elasticbeanstalk.com/engagement", body)
    .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch({ type: UPDATE_DATA, payload: res.data });
    })
    .catch(err => {
        console.log('Error fetching data', err);
    });
};


