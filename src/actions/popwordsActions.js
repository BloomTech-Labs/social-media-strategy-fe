import axios from "axios";
import { UPDATE_STATUS, SET_TOPICS, ERROR } from "./popwordsActionTypes";

export function getWords() {
	return async (dispatch, getState) => {
		const body = { twitter_handle: `${getState().user.twitter_handle}` };

		axios
			.post(
				"http://so-me-fastapi.eba-ghirpj73.us-east-1.elasticbeanstalk.com/topic_model/get_topics",
				body,
			)
			.then((res) => {
				const topics = Object.values(res.data.topics);
				dispatch({ type: SET_TOPICS, payload: topics });
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
		"http://so-me-fastapi.eba-ghirpj73.us-east-1.elasticbeanstalk.com/topic_model/status",
		body,
	);

	dispatch({ type: UPDATE_STATUS, payload: data });
};

export const requestPopWords = (
	numFollowers = 500,
	maxAge = 7,
	ignoredWords = [],
) => async (dispatch, getState) => {
	const body = {
		twitter_handle: `${getState().user.twitter_handle}`,
		num_followers_to_scan: numFollowers,
		max_age_of_tweet: maxAge,
		words_to_ignore: ignoredWords,
	};

	await axios.post(
		"http://so-me-fastapi.eba-ghirpj73.us-east-1.elasticbeanstalk.com/topic_model/schedule",
		body,
	);

	// update status
	await dispatch(getStatus());
};
