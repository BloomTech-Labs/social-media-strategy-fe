import {
	ADD_LIST_SCHEDULE,
	REMOVE_LIST_SCHEDULE,
} from "../actions/scheduleActionTypes";
import {
	UPDATE_LISTS,
	ADD_LIST,
	EDIT_LIST,
	DELETE_LIST,
	ADD_POST,
	EDIT_POST,
	DELETE_POST,
	POST_TWEET,
	SCHEDULE_TWEET,
} from "../actions/kanbanActionTypes";

const initialState = {
	lists: null,
};

const kanbanReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_LISTS:
			return {
				...state,
				lists: payload,
			};
		case ADD_LIST:
			return {
				...state,
				lists: {
					...state.lists,
					[payload.id]: {
						...payload,
						posts: [],
						schedule: [],
					},
				},
			};
		case EDIT_LIST:
			return {
				...state,
				lists: {
					...state.lists,
					[payload.id]: {
						...state.lists[payload.id],
						...payload,
					},
				},
			};
		case DELETE_LIST:
			const updatedLists = payload;
			return {
				...state,
				lists: updatedLists,
			};
		case ADD_POST:
			// payload: new post
			return {
				...state,
				lists: {
					...state.lists,
					[payload.list_id]: {
						...state.lists[payload.list_id],
						posts: [...state.lists[payload.list_id].posts, payload],
					},
				},
			};
		case EDIT_POST: {
			// payload: updated post
			const updatedPosts = state.lists[payload.list_id].posts.map((post) => {
				console.log(post.index);
				if (post.id === payload.id) {
					return payload;
				}

				return post;
			});

			return {
				...state,
				lists: {
					...state.lists,
					[payload.list_id]: {
						...state.lists[payload.list_id],
						posts: updatedPosts,
					},
				},
			};
		}
		case DELETE_POST: {
			const { listId, updatedPosts } = payload;
			return {
				...state,
				lists: {
					...state.lists,
					[listId]: {
						...state.lists[listId],
						posts: updatedPosts,
					},
				},
			};
		}
		case POST_TWEET: {
			const { listId, updatedPosts } = payload;
			return {
				...state,
				lists: {
					...state.lists,
					[listId]: {
						...state.lists[listId],
						posts: updatedPosts,
					},
				},
			};
		}
		case SCHEDULE_TWEET: {
			const { listId, updatedPosts } = payload;

			return {
				...state,
				lists: {
					...state.lists,
					[listId]: {
						...state.lists[listId],
						posts: updatedPosts,
					},
				},
			};
		}
		case ADD_LIST_SCHEDULE: {
			// payload = created schedule obj
			const { list_id } = payload;
			return {
				...state,
				lists: {
					...state.lists,
					[list_id]: {
						...state.lists[list_id],
						schedule: [...state.lists[list_id].schedule, payload],
					},
				},
			};
		}
		case REMOVE_LIST_SCHEDULE: {
			const { scheduleId, listId } = payload;
			return {
				...state,
				lists: {
					...state.lists,
					[listId]: {
						...state.lists[listId],
						schedule: state.lists[listId].schedule.filter((e) => e.id !== scheduleId),
					},
				},
			};
		}
		default:
			return state;
	}
};

export default kanbanReducer;
