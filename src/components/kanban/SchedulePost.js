import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
	KeyboardTimePicker,
} from "@material-ui/pickers";
import ModalAlert from "../templates/Modal";
import DateFnsUtils from "@date-io/date-fns";

const SchedulePost = ({ postId }) => {
	const [schedule, setSchedule] = useState(new Date());
	const [modalOpen, setModalOpen] = useState(false);

	const handleChange = (date) => {
		setSchedule(date);
	};

	const handleSubmit = () => {
		// dispatch action
	};

	return (
		<>
			<Button onClick={() => setModalOpen(true)} color="primary">
				Schedule
			</Button>
			<ModalAlert
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				title="Schedule Post"
				handleConfirmation={handleSubmit}
			>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container direction="column" justify="space-around">
						<KeyboardDatePicker
							minDate={new Date()}
							margin="normal"
							defa
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
							margin="normal"
							id="time-picker"
							label="Time"
							value={schedule}
							onChange={handleChange}
							KeyboardButtonProps={{
								"aria-label": "change time",
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
			</ModalAlert>
		</>
	);
};

export default SchedulePost;
