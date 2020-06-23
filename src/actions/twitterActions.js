import { axiosWithAuth } from "../utils/axiosWithAuth";
import { POST_TWEET, SCHEDULE_TWEET } from "./kanbanActionTypes";

export const postTweet = (postId) => async (dispatch, getState) => {
	const { data } = await axiosWithAuth().put(`/posts/${postId}/postnow`);

	const { posts } = getState().kanban.lists[data.list_id];

	const updatedPosts = posts.map((post) => {
		if (post.id === postId) {
			return data;
		}

		return post;
	});

	// dispatch action to update redux
	dispatch({
		type: POST_TWEET,
		payload: {
			listId: data.list_id,
			updatedPosts,
		},
	});
};

export const scheduleTweet = (postId, date) => async (dispatch, getState) => {
	const { data } = await axiosWithAuth().put(`/posts/${postId}/schedule`, {
		date,
	});

	const { posts } = getState().kanban.lists[data.list_id];

	const updatedPosts = posts.map((post) => {
		if (post.id === postId) {
			return data;
		}

		return post;
	});

	dispatch({
		type: SCHEDULE_TWEET,
		payload: {
			listId: data.list_id,
			updatedPosts,
		},
	});
};
