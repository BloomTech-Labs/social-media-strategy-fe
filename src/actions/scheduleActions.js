import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ADD_SCHEDULE, REMOVE_SCHEDULE } from "./scheduleActionTypes";

export const addSchedule = (listId, weekDay, hour, minute) => async (
	dispatch,
) => {
	const { data } = await axiosWithAuth().post(`/lists/${listId}/schedule`, {
		week_day: weekDay,
		hour,
		minute,
	});

	dispatch({
		type: ADD_SCHEDULE,
		payload: data,
	});
};

export const removeSchedule = (listId, scheduleId) => async (dispatch) => {
	const { data } = await axiosWithAuth().delete(
		`/lists/${listId}/schedule/${scheduleId}`,
	);

	dispatch({
		type: REMOVE_SCHEDULE,
		payload: {
			listId,
			scheduleId,
		},
	});
};
