import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
	KeyboardTimePicker,
} from "@material-ui/pickers";
import ModalAlert from "../templates/Modal";
import DateFnsUtils from "@date-io/date-fns";

const SchedulePost = () => {
	const [schedule, setSchedule] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const handleChange = (date) => {
		console.log("DATE********:", date);
		setSchedule((prevSchedule) => ({
			...prevSchedule,
			date,
		}));
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
				handleConfirmation={() => console.log("confirmed")}
			>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
							margin="normal"
							id="date-picker-dialog"
							label="Date picker dialog"
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
							label="Time picker"
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
