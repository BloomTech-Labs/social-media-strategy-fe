import { axiosWithAuth } from "../utils/axiosWithAuth";
import { POST_TWEET, SCHEDULE_TWEET } from "./kanbanActionTypes";

export const postTweet = (postId) => async (dispatch) => {
	const { data } = await axiosWithAuth().put(`/posts/${postId}/postnow`);

	// dispatch action to update redux
	dispatch({
		type: POST_TWEET,
		payload: {
			listId: data.list_id,
			postId: data.id,
		},
	});
};

export const scheduleTweet = (postId, date) => async (dispatch) => {
	const { data } = await axiosWithAuth().put(`/posts/${postId}/schedule`, {
		date,
	});

	dispatch({
		type: SCHEDULE_TWEET,
		payload: {
			scheduledTime: data.scheduled_time,
		},
	});
};
