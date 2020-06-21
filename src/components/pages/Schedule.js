import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadListsFromDb } from "../../actions/listsActions";
import Scrollbars from "react-custom-scrollbars";
// Material-UI
import {
	makeStyles,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
} from "@material-ui/core";
// Components
import ListSchedule from "../schedule/ListSchedule";

const useStyles = makeStyles((theme) => ({
	header: {
		width: "100%",
		textAlign: "center",
	},
	formControl: {
		minWidth: 200,
		marginTop: theme.spacing(2),
	},
}));

const Schedule = () => {
	const user = useSelector((state) => state.user);
	const { lists } = useSelector((state) => state.kanban);
	const [selectedList, setSelectedList] = useState("");
	const dispatch = useDispatch();

	const { header, formControl } = useStyles();

	useEffect(() => {
		if (user.okta_uid) {
			if (!lists) {
				console.log("loading lists");
				(async () => {
					dispatch(await loadListsFromDb(user.okta_uid));
				})();
			}
		}
		// eslint-disable-next-line
	}, [user]);

	const handleSelectList = (e) => {
		const target = e.target;

		setSelectedList(target.value);
	};

	return (
		<Scrollbars>
			<Typography component="h1" variant="h4" className={header}>
				Schedule
			</Typography>

			{lists ? (
				Object.keys(lists).length > 1 ? (
					<FormControl className={formControl}>
						<InputLabel id="list_label">Category</InputLabel>
						<Select
							labelId="list_label"
							id="list_select"
							value={selectedList}
							onChange={handleSelectList}
						>
							{lists &&
								Object.values(lists).map((list) => {
									if (list.title !== "Drafts") {
										return (
											<MenuItem key={list.id} value={list.id}>
												{list.title}
											</MenuItem>
										);
									}
								})}
						</Select>
					</FormControl>
				) : (
					<p>please add a list to have access to the schedule</p>
				)
			) : (
				<div style={{ width: "100%", textAlign: "center", marginTop: "70px" }}>
					<CircularProgress />
				</div>
			)}

			{selectedList && <ListSchedule listId={selectedList} />}
		</Scrollbars>
	);
};

export default Schedule;
