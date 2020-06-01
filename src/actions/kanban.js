import { UPDATE_LISTS } from './types';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    console.log('array', array);
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

export const dragPostToDifferentList = (lists, source, destination) => dispatch => {
    const sourceList = lists[source.droppableId];
    const destList = lists[destination.droppableId];

    const sourcePosts = [...sourceList.posts];
    const destPosts = [...destList.posts];

    // remove post from source list
    const [post] = sourcePosts.splice(source.index, 1);
    // add post to destination list
    destPosts.splice(destination.index, 0, {
        ...post,
        // Update listId
        listId: destination.droppableId,
    });

    const updatedLists = {
        ...lists,
        // Update posts/posts of the source column/list
        [source.droppableId]: {
            ...sourceList,
            posts: sourcePosts.map((element) => ({
                ...element,
                // update each post's index
                index: sourcePosts.findIndex((el) => el.id === element.id),
            })),
        },
        // Update posts/posts of the destination column/list
        [destination.droppableId]: {
            ...destList,
            posts: destPosts.map((element) => ({
                ...element,
                // update each post's index
                index: destPosts.findIndex((el) => el.id === element.id),
            })),
        },
    }

    dispatch({
        type: UPDATE_LISTS,
        payload: updatedLists
    });
}

export const dragPostToSameList = (lists, source, destination) => dispatch => {
    const list = lists[source.droppableId];
    const posts = [...list.posts];
    // remove item
    const [item] = posts.splice(source.index, 1);
    // add item to new index
    posts.splice(destination.index, 0, item);

    const updatedLists = {
        ...lists,
        [source.droppableId]: {
            ...list,
            posts: posts.map(post => ({
                ...post,
                index: posts.findIndex((el) => el.id === post.id),
            })),
        }
    }
    
    dispatch({
        type: UPDATE_LISTS,
        payload: updatedLists
    });
}

export const dragList = (lists, source, destination) => async dispatch => {
    const listsArray = Object.values(lists).sort((a, b) => a.index - b.index);
    const [column] = listsArray.splice(source.index, 1);
    listsArray.splice(destination.index, 0, column);

    const listsToBeUpdated = [];
    // update indexes
    const updateIndexesPromises = listsArray.map((list) => {
        const newIndex = listsArray.findIndex((el) => el.id === list.id);
        // check if index has changed and need to be updated
        if (
            (source.index < destination.index && newIndex <= destination.index && newIndex >= source.index) || 
            (source.index > destination.index && newIndex >= destination.index && newIndex <= source.index)
        ) {
            // save lists id to update DB
            listsToBeUpdated.push({ id: list.id, index: newIndex });
            
            return {
                ...list,
                index: newIndex,
            }
        } else {
            return list;
        }
    });

    const updatedIndexes = await Promise.all(updateIndexesPromises);

    const updatedLists = convertArrayToObject(updatedIndexes, 'id');

    // Update state first to avoid component rerender in wrong order
    dispatch({
        type: UPDATE_LISTS,
        payload: updatedLists
    });

     // update indexes in the DB
     listsToBeUpdated.forEach(async ({ id, index }) => {
        await axiosWithAuth().patch(`/lists/${id}`, { index });
    });
}