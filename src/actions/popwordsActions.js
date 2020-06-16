import axios from "axios";

export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";

export function getWords() {
  return async (dispatch, getState) => {
    const body = { twitter_handle: `${getState().user.twitter_handle}` };

    dispatch({
      type: SEARCH_REQUEST
    });

    axios
      .post("https://api.so-me.net/topic_model/get_topics", body)
      .then(res => {
        console.log(res);
        console.log("response!!!", res.data);
        dispatch({ type: SEARCH_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({
          type: SEARCH_FAILURE,
          payload: err
        });
      });
  };
}
