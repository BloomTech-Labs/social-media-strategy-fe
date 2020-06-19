import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ADD_POST, EDIT_POST, DELETE_POST } from "./kanbanActionTypes";

export const addPost = (post) => async (dispatch) => {
	const { list_id } = post;
	const { data } = await axiosWithAuth().post(`/lists/${list_id}/posts`, post);

	dispatch({
		type: ADD_POST,
		payload: data,
	});
};

export const deletePost = (post) => async (dispatch, getState) => {
	const { lists } = getState().kanban;

	// array to save id and new index of lists posts that change index
	const postsToBeUpdated = [];

	const updatedPosts = lists[post.list_id].posts
		.filter((current) => current.id !== post.id)
		.map((current) => {
			if (current.index > post.index) {
				const newIndex = current.index - 1;

				// save id and index to update/patch in DB
				postsToBeUpdated.push({
					id: current.id,
					index: newIndex,
				});

				return {
					...current,
					index: newIndex,
				};
			}
			return current;
		});

	dispatch({
		type: DELETE_POST,
		payload: {
			listId: post.list_id,
			updatedPosts,
		},
	});

	// delete post from DB
	await axiosWithAuth().delete(`/posts/${post.id}`);

	// Update indexes in DB
	postsToBeUpdated.forEach(async ({ id, index }) => {
		await axiosWithAuth().patch(`/posts/${id}`, { index });
	});
};

export const updatePost = (postId, changes) => async (dispatch) => {
	const { data } = await axiosWithAuth().patch(`/posts/${postId}`, changes);

	dispatch({
		type: EDIT_POST,
		payload: data,
	});
};
