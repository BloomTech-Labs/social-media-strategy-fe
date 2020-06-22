import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ADD_LIST_SCHEDULE, REMOVE_LIST_SCHEDULE } from "./scheduleActionTypes";

export const addListSchedule = (listId, weekday, hour, minute) => async (
	dispatch,
) => {
	const { data } = await axiosWithAuth().post(`/lists/${listId}/schedule`, {
		weekday,
		hour,
		minute,
	});

	dispatch({
		type: ADD_LIST_SCHEDULE,
		payload: data,
	});
};

export const removeListSchedule = (listId, scheduleId) => async (dispatch) => {
	const { data } = await axiosWithAuth().delete(
		`/lists/${listId}/schedule/${scheduleId}`,
	);

	dispatch({
		type: REMOVE_LIST_SCHEDULE,
		payload: {
			listId,
			scheduleId,
		},
	});
};

export const getScheduleList = async (listId, numberOfPosts = 1) => {
	const { data } = await axiosWithAuth().get(
		`/lists/${listId}/schedule/${numberOfPosts}`,
	);

	const sortedByDate = data.sort((a, b) => {
		if (a.date < b.date) {
			return -1;
		}
		return 1;
	});

	return sortedByDate;
};
