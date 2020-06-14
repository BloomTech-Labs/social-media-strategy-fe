import axios from "axios";

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export function getWords() {
    return (dispatch, getState) => {
    const body = { twitter_handle: `${getState().user.twitter_handle}`};
    
    dispatch({
        type: SEARCH_REQUEST
    });

    axios
    .post("http://so-me-fastapi.eba-ghirpj73.us-east-1.elasticbeanstalk.com/topic_model/get_topics", body)
    .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch({ type: SEARCH_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({
            type: SEARCH_FAILURE,
            payload: err,    
        });     
    });
};
}