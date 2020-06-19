import React, { useState } from "react";
import { useDispatch } from "react-redux";
// redux action
import { scheduleTweet } from "../../actions/twitterActions";
import { Grid, Button, Typography } from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
	KeyboardTimePicker,
} from "@material-ui/pickers";
import Modal from "../templates/Modal";
import DateFnsUtils from "@date-io/date-fns";

const SchedulePost = ({ postId, scheduledTime }) => {
	const [schedule, setSchedule] = useState(scheduledTime || new Date());
	const [invalidDate, setInvalidDate] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const dispatch = useDispatch();

	const handleChange = (date, e) => {
		console.log(e);
		setInvalidDate(false);
		setSchedule(date);
	};

	const handleSchedulePost = async () => {
		if (schedule > Date.now()) {
			await dispatch(scheduleTweet(postId, schedule));
		} else {
			setInvalidDate(true);
		}
	};

	return (
		<>
			<Button onClick={() => setModalOpen(true)} color="primary">
				{scheduledTime ? "Reschedule" : "Schedule"}
			</Button>
			<Modal
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				title="Schedule Post"
				handleConfirmation={handleSchedulePost}
			>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container direction="column" justify="space-around">
						<KeyboardDatePicker
							minDate={new Date()}
							margin="normal"
							id="date-picker-dialog"
							label="Date"
							format="MM/dd/yyyy"
							value={schedule}
							onChange={handleChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
						/>
						<KeyboardTimePicker
							minDate={new Date()}
							margin="normal"
							id="time-picker"
							label="Time"
							value={schedule}
							onChange={handleChange}
							KeyboardButtonProps={{
								"aria-label": "change time",
							}}
						/>
						{invalidDate && (
							<Typography variant="caption" color="error">
								Invalid time
							</Typography>
						)}
					</Grid>
				</MuiPickersUtilsProvider>
			</Modal>
		</>
	);
};

export default SchedulePost;
