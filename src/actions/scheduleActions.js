import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ADD_LIST_SCHEDULE, REMOVE_LIST_SCHEDULE } from "./scheduleActionTypes";

export const addSchedule = (listId, weekday, hour, minute) => async (
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

export const removeSchedule = (listId, scheduleId) => async (dispatch) => {
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
