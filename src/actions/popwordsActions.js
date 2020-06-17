import axios from "axios";
import { UPDATE_STATUS, SET_TOPICS, ERROR } from "./popwordsActionTypes";

export function getWords(twitter_handle) {
	return async (dispatch, getState) => {
		const body = { twitter_handle };

		axios
			.post("https://api.so-me.net/topic_model/get_topics", body)
			.then((res) => {
				if (res.data.success) {
					const topics = Object.values(res.data.topics);
					dispatch({ type: SET_TOPICS, payload: topics });
				}
			})
			.catch((err) => {
				dispatch({
					type: ERROR,
					payload: err,
				});
			});
	};
}

export const getStatus = (twitter_handle) => async (dispatch, getState) => {
	const body = {
		twitter_handle,
	};
	const { data } = await axios.post(
		"https://api.so-me.net/topic_model/status",
		body,
	);

	dispatch({ type: UPDATE_STATUS, payload: data });
};

export const requestPopWords = (
	twitter_handle,
	numFollowers = 500,
	maxAge = 7,
	ignoredWords = [],
) => async (dispatch) => {
	const body = {
		twitter_handle,
		num_followers_to_scan: numFollowers,
		max_age_of_tweet: maxAge,
		words_to_ignore: ignoredWords,
	};

	await axios.post("https://api.so-me.net/topic_model/schedule", body);

	// update status
	await dispatch(getStatus(twitter_handle));
};
