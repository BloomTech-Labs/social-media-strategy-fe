import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addListSchedule } from "../../actions/scheduleActions";
import { getTime } from "../../utils/dateFunctions";
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
	const dispatch = useDispatch();
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

	const handleAddSchedule = async (e) => {
		e.preventDefault();
		console.log("add time");
		const { weekday, time } = schedule;
		const hour = time.getHours();
		const minute = time.getMinutes();

		setModalOpen(false);

		await dispatch(addListSchedule(listId, weekday, hour, minute));
	};

	return (
		<div className={scheduleContainer}>
			{weekdays.map((day, index) => (
				<div key={index} className={dailySchedule}>
					<Typography align="center" variant="h6">
						{day}
					</Typography>
					{list.schedule
						.filter((e) => e.weekday === index)
						.map((e) => {
							const { hour, minute } = e;
							const time = `${
								(hour < 10 && "0") + hour > 12 ? hour - 12 : hour
							}:${(minute < 10 && "0") + minute}${hour > 12 ? "pm" : "am"}`;
							return (
								<Typography key={e.id} variant="h6">
									{time}
								</Typography>
							);
						})}
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
