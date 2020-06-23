import { axiosWithAuth } from "../utils/axiosWithAuth";
import { POST_TWEET, SCHEDULE_TWEET } from "./kanbanActionTypes";

export const postTweet = (postId) => async (dispatch, getState) => {
	const { data } = await axiosWithAuth().put(`/posts/${postId}/postnow`);

	const { posts } = getState().kanban.lists[data.list_id];

	const updatedPosts = posts.filter((post) => post.id !== postId);

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

	// update indexes from posts
	const { posts } = getState().kanban.lists[data.list_id];

	const updatedPosts = posts.map(async (post) => {
		if (post.id === postId) {
			const res = await axiosWithAuth().patch(`/posts/${post.id}`, {
				index: null,
			});
			return res.data;
		} else if (post.index > data.index) {
			const res = await axiosWithAuth().patch(`/posts/${post.id}`, {
				index: post.index - 1,
			});
			return res.data;
		}

		return post;
	});

	dispatch({
		type: SCHEDULE_TWEET,
		payload: {
			listId: data.list_id,
			updatedPosts: updatedPosts.filter((post) => post.index !== null),
		},
	});
};
