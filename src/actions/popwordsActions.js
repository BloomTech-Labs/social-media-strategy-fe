import axios from "axios";


export const GET_WORDS = 'GET_WORDS';
export const UPDATE_WORDS = 'UPDATE_WORDS';

export function getWords() {
    return (dispatch, getState) => {
    const body = { twitter_handle: `${getState().user.twitter_handle}`};
    axios
    .post("http://so-me-fastapi.eba-ghirpj73.us-east-1.elasticbeanstalk.com/topic_model/get_topics", body)
    .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch({ type: UPDATE_WORDS, payload: res.data });
    })
    .catch(err => {
        console.log('Error fetching data', err);
    });
};
}