import axios from "axios";


export const GET_DATA = 'GET_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

export function getData() {
    return (dispatch, getState) => {
    const body = { twitter_handle: `${getState().user.twitter_handle}`};
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
}

