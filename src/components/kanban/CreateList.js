import React, { useState } from "react";
import { useDispatch } from "react-redux";
// material-ui
import { InputBase, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core";
import { addList } from "../../actions";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 8px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: theme.shape.borderRadius,
		width: 275,
		minWidth: 275,
		marginLeft: theme.spacing(2),
		height: "max-content",
		backgroundColor: "#fff",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

export default function CreateList() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [title, setTitle] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && title !== "Drafts") {
			dispatch(addList(title));
		}
	};

	const handleTextInput = (e) => {
		setTitle(e.currentTarget.value);
	};

	return (
		<form onSubmit={handleSubmit} className={classes.root}>
			<InputBase
				placeholder="New list…"
				inputProps={{ "aria-label": "add list" }}
				onChange={handleTextInput}
				fullWidth
			/>

			<IconButton
				type="submit"
				className={classes.iconButton}
				aria-label="search"
			>
				<AddIcon />
			</IconButton>
		</form>
	);
}
