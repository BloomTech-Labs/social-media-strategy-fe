import { axiosWithAuth } from '../utils/axiosWithAuth';
import { 
    UPDATE_LISTS,
    ADD_LIST,
    ADD_POST
} from './kanbanActionTypes';

const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

export const loadListsFromDb = (userId) => async dispatch => {
    const { data } = await axiosWithAuth().get(`/users/${userId}/lists`);

    // sort lists by index
    const sortedLists = data.sort((a, b) => a.index - b.index);

    // load each list's posts
    const listsPromises = sortedLists.map(async list => {
        const res = await axiosWithAuth().get(`/lists/${list.id}/posts`);
        
        return {
            ...list,
            posts: res.data
        }
    });

    const lists = await Promise.all(listsPromises);

    const listsObj = convertArrayToObject(lists, 'id');
    
    dispatch({
        type: UPDATE_LISTS,
        payload: listsObj
    });
}

export const addList = (title) => async dispatch => {
    let { data } = await axiosWithAuth().post(`/lists`, {
        title
    });

    dispatch({
        type: ADD_LIST,
        payload: data
    });
}

export const addPost = (post) => async dispatch => {
    let { data } = await axiosWithAuth().post(`/posts`, post);

    console.log('new post', data);

    dispatch({
        type: ADD_POST,
        payload: data
    });
}