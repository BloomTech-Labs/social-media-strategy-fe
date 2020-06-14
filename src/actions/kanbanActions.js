import { UPDATE_LISTS } from './kanbanActionTypes';
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

const needsToUpdateIndex = (source, destination, itemIndex, droppableId) => {
    // same column / droppable
    if(source.droppableId === destination.droppableId) {
        return (
            (source.index < destination.index && itemIndex <= destination.index && itemIndex >= source.index) || 
            (source.index > destination.index && itemIndex >= destination.index && itemIndex <= source.index)
        );
    } else { // different column/droppable
        // source droppable
        if (source.droppableId === droppableId) {
            return itemIndex >= source.index;
        } else { // destination droppable
            return itemIndex >= destination.index;
        }
    }
};

export const dragPostToDifferentList = (lists, source, destination) => dispatch => {
    const sourceList = lists[source.droppableId];
    const destList = lists[destination.droppableId];

    const sourcePosts = [...sourceList.posts];
    const destPosts = [...destList.posts];

    // remove post from source list
    const [item] = sourcePosts.splice(source.index, 1);
    // add post to destination list
    destPosts.splice(destination.index, 0, {
        ...item,
        // Update listId
        list_id: destination.droppableId,
    });

    const postsToBeUpdated = [];

    const updatedLists = {
        ...lists,
        // Update posts/posts of the source column/list
        [source.droppableId]: {
            ...sourceList,
            posts: sourcePosts.map((post) => {
                const newIndex = sourcePosts.findIndex((el) => el.id === post.id);
                if (needsToUpdateIndex(source, destination, newIndex, source.droppableId)) {
                    // save posts id and data that need to be updated in DB
                    postsToBeUpdated.push({ 
                        id: post.id,
                        updates: {
                            index: newIndex
                        }
                    });
                    return {
                        ...post,
                        // update each post's index
                        index: newIndex,
                    };
                } else {
                    return post;
                }
            }),
        },
        // Update posts/posts of the destination column/list
        [destination.droppableId]: {
            ...destList,
            posts: destPosts.map((post) => {
                const newIndex = destPosts.findIndex((el) => el.id === post.id);
                if (needsToUpdateIndex(source, destination, newIndex, destination.droppableId)) {
                    postsToBeUpdated.push({ 
                        id: post.id,
                        updates: {
                            index: newIndex,
                            // make sure to send list_id to update list_id of the dragged post
                            list_id: destination.droppableId
                        }
                    });
                    return {
                        ...post,
                        // update each post's index
                        index: newIndex,
                    };
                } else {
                    return post;
                }
            }),
        },
    };

    dispatch({
        type: UPDATE_LISTS,
        payload: updatedLists
    });

    // update indexes in the DB
    postsToBeUpdated.forEach(async ({ id, updates }) => {
        await axiosWithAuth().patch(`/posts/${id}`, updates);
    });
};

export const dragPostToSameList = (lists, source, destination) => dispatch => {
    const list = lists[source.droppableId];
    const posts = [...list.posts];
    // remove item
    const [item] = posts.splice(source.index, 1);
    // add item to new index
    posts.splice(destination.index, 0, item);

    const postsToBeUpdated = [];

    const updatedLists = {
        ...lists,
        [source.droppableId]: {
            ...list,
            // update posts indexes
            posts: posts.map(post => {
                const newIndex = posts.findIndex((el) => el.id === post.id);
                if (needsToUpdateIndex(source, destination, newIndex, source.droppableId)) {
                    // save posts id to update DB
                    postsToBeUpdated.push({ id: post.id, index: newIndex });
                    return {
                        ...post,
                        index: newIndex,
                    };
                } else {
                    return post;
                }
            }),
        }
    };
    
    dispatch({
        type: UPDATE_LISTS,
        payload: updatedLists
    });

    // update indexes in the DB
    postsToBeUpdated.forEach(async ({ id, index }) => {
        await axiosWithAuth().patch(`/posts/${id}`, { index });
    });
};

export const dragList = (lists, source, destination) => async dispatch => {
    const listsArray = Object.values(lists).sort((a, b) => a.index - b.index);
    const [column] = listsArray.splice(source.index, 1);
    listsArray.splice(destination.index, 0, column);

    const listsToBeUpdated = [];
    // update indexes
    const updateIndexesPromises = listsArray.map((list) => {
        const newIndex = listsArray.findIndex((el) => el.id === list.id);
        // check if index has changed and need to be updated
        if (needsToUpdateIndex(source, destination, newIndex, source.droppableId)) {
            // save lists id to update DB
            listsToBeUpdated.push({ id: list.id, index: newIndex });
            
            return {
                ...list,
                index: newIndex,
            };
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
};