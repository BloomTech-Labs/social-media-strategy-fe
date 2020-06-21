import React, { useState } from "react";
import { useSelector } from "react-redux";
// Material-ui
import { makeStyles, Button, Typography } from "@material-ui/core";
import { TimePicker } from "material-ui-time-picker";
import AddIcon from "@material-ui/icons/Add";
// Components
import Modal from "../templates/Modal";

const useStyles = makeStyles((theme) => ({
	scheduleContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
	},
	dailySchedule: {
		width: 100,
	},
}));

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ListSchedule = ({ listId }) => {
	const list = useSelector((state) => state.kanban.lists[listId]);
	const [modalOpen, setModalOpen] = useState(false);
	const [schedule, setSchedule] = useState({
		weekday: 0,
		time: new Date(),
	});

	const { scheduleContainer, dailySchedule } = useStyles();

	const handleSelectDay = (weekday) => {
		setSchedule((prev) => ({
			...prev,
			weekday,
		}));
		setModalOpen(true);
	};

	const handleTimeChange = (newValue) => {
		const time = new Date(newValue);

		setSchedule((prev) => ({
			...prev,
			time,
		}));
	};

	const handleAddSchedule = () => {
		console.log("add time");
	};

	return (
		<div className={scheduleContainer}>
			{weekdays.map((day, index) => (
				<div key={index} className={dailySchedule}>
					<Typography align="center" variant="h6">
						{day}
					</Typography>
					<Button
						style={{ height: 50 }}
						fullWidth
						color="primary"
						onClick={() => handleSelectDay(index)}
					>
						<AddIcon size="small" color="disabled" />
					</Button>
				</div>
			))}

			<Modal
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				noDialogContent={true}
				handleConfirmation={handleAddSchedule}
			>
				<TimePicker
					mode="12h"
					onChange={handleTimeChange}
					defaultValue={schedule.time}
				/>
			</Modal>
		</div>
	);
};

export default ListSchedule;
