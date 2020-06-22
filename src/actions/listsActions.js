import { axiosWithAuth } from "../utils/axiosWithAuth";
import {
  UPDATE_LISTS,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST
} from "./kanbanActionTypes";

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};

export const loadListsFromDb = userId => async dispatch => {
  const { data } = await axiosWithAuth().get(`/lists`);

  // sort lists by index
  const sortedLists = data.sort((a, b) => a.index - b.index);

  // load each list's posts
  const listsPromises = sortedLists.map(async list => {
    const res = await axiosWithAuth().get(`/lists/${list.id}/posts`);

    return {
      ...list,
      posts: res.data.sort((a, b) => a.index - b.index)
    };
  });

  const lists = await Promise.all(listsPromises);

  const listsObj = convertArrayToObject(lists, "id");

  dispatch({
    type: UPDATE_LISTS,
    payload: listsObj
  });
};

export const addList = title => async dispatch => {
  const { data } = await axiosWithAuth().post(`/lists`, {
    title
  });

  dispatch({
    type: ADD_LIST,
    payload: data
  });
};

export const updateList = (listId, changes) => async dispatch => {
  const { data } = await axiosWithAuth().patch(`/lists/${listId}`, changes);

  dispatch({
    type: EDIT_LIST,
    payload: data
  });
};

export const deleteList = (lists, listToDelete) => async dispatch => {
  // array to save id and new index of lists that change index
  const listsToBeUpdated = [];

  const updatedLists = Object.keys(lists)
    .filter(key => key !== listToDelete.id)
    .reduce((result, currentId) => {
      if (lists[currentId].index < listToDelete.index) {
        result[currentId] = lists[currentId];
      } else {
        const updatedList = {
          ...lists[currentId],
          index: lists[currentId].index - 1
        };

        // save id and index to update/patch in DB
        listsToBeUpdated.push({
          id: updatedList.id,
          index: updatedList.index
        });

        result[currentId] = updatedList;
      }

      return result;
    }, {});

  dispatch({
    type: DELETE_LIST,
    payload: updatedLists
  });

  // Delete list in DB
  await axiosWithAuth().delete(`/lists/${listToDelete.id}`);

  // Update indexes in DB
  listsToBeUpdated.forEach(async ({ id, index }) => {
    await axiosWithAuth().patch(`/lists/${id}`, { index });
  });
};

export const addPost = post => async dispatch => {
  const { list_id } = post;
  const { data } = await axiosWithAuth().post(`/lists/${list_id}/posts`, post);

  dispatch({
    type: ADD_POST,
    payload: data
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

export const updatePost = (postId, changes) => async dispatch => {
  const { data } = await axiosWithAuth().patch(`/posts/${postId}`, changes);

  dispatch({
    type: EDIT_POST,
    payload: data
  });
};
