import { UPDATE_LISTS } from './types';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

export const loadPostsFromDb = (userId) => async dispatch => {
    let lists = await axiosWithAuth().get(`/users/${userId}/lists`);
    // sort lists by index
    const sortedLists = lists.sort((a, b) => a.index < b.index);
    
    // load each list's posts
    lists = sortedLists.map(async list => {
        const posts = await axiosWithAuth().get(`/lists/${list.id}/posts`);
        return {
            ...list,
            posts
        }
    });

    const listsObj = convertArrayToObject(lists, 'id');

    dispatch({
        type: UPDATE_LISTS,
        payload: listsObj
    });
}

export const addList = (title) => async dispatch => {
    // I can't find a route to add a list
    const list = await axiosWithAuth().post(`/lists`, {
        title
    });
}