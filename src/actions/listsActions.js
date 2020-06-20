import { axiosWithAuth } from "../utils/axiosWithAuth";
import {
	UPDATE_LISTS,
	ADD_LIST,
	EDIT_LIST,
	DELETE_LIST,
} from "./kanbanActionTypes";

const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

export const loadListsFromDb = (userId) => async (dispatch) => {
	const { data } = await axiosWithAuth().get(`/lists`);

	// sort lists by index
	const sortedLists = data.sort((a, b) => a.index - b.index);

	// load each list's posts
	const listsPromises = sortedLists.map(async (list) => {
		const resPosts = await axiosWithAuth().get(`/lists/${list.id}/posts`);
		const resSchedule = await axiosWithAuth().get(`/lists/${list.id}/schedule`);

		return {
			...list,
			posts: resPosts.data.sort((a, b) => a.index - b.index),
			schedule: resSchedule.data, // TODO sort schedule array
		};
	});

	const lists = await Promise.all(listsPromises);

	const listsObj = convertArrayToObject(lists, "id");

	dispatch({
		type: UPDATE_LISTS,
		payload: listsObj,
	});
};

export const addList = (title) => async (dispatch) => {
	const { data } = await axiosWithAuth().post(`/lists`, {
		title,
	});

	dispatch({
		type: ADD_LIST,
		payload: data,
	});
};

export const updateList = (listId, changes) => async (dispatch) => {
	const { data } = await axiosWithAuth().patch(`/lists/${listId}`, changes);

	dispatch({
		type: EDIT_LIST,
		payload: data,
	});
};

export const deleteList = (lists, listToDelete) => async (dispatch) => {
	// array to save id and new index of lists that change index
	const listsToBeUpdated = [];

	const updatedLists = Object.keys(lists)
		.filter((key) => key !== listToDelete.id)
		.reduce((result, currentId) => {
			if (lists[currentId].index < listToDelete.index) {
				result[currentId] = lists[currentId];
			} else {
				const updatedList = {
					...lists[currentId],
					index: lists[currentId].index - 1,
				};

				// save id and index to update/patch in DB
				listsToBeUpdated.push({
					id: updatedList.id,
					index: updatedList.index,
				});

				result[currentId] = updatedList;
			}

			return result;
		}, {});

	dispatch({
		type: DELETE_LIST,
		payload: updatedLists,
	});

	// Delete list in DB
	await axiosWithAuth().delete(`/lists/${listToDelete.id}`);

	// Update indexes in DB
	listsToBeUpdated.forEach(async ({ id, index }) => {
		await axiosWithAuth().patch(`/lists/${id}`, { index });
	});
};
