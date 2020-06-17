import React, { useState } from "react";
import { deleteList } from "../../actions/listsActions";
import { useDispatch, useSelector } from "react-redux";
import { InputBase, IconButton, makeStyles, Divider } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../templates/Modal";

const useStyles = makeStyles((theme) => ({
	form: {
		padding: "2px 0",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: theme.shape.borderRadius,
		width: "100%",
		height: "max-content",
		backgroundColor: "#fff",
	},
	iconButton: {
		padding: 5,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	input: {
		fontFamily: theme.typography.h6.fontFamily,
		fontSize: theme.typography.h6.fontSize,
		color: theme.typography.h6.color,
	},
}));

const EditList = (props) => {
	const { listTitle, list, handleInputText, submit } = props;

	const { form, iconButton, divider, input } = useStyles();

	const dispatch = useDispatch();
	const { lists } = useSelector((state) => state.kanban);

	const [modalOpen, setModalOpen] = useState(false);

	const handleDeleteConfirmation = () => {
		dispatch(deleteList(lists, list));
	};

	const handleBlur = (e) => {
		if (!modalOpen) {
			submit(e);
		}
	};

	return (
		<>
			<form onSubmit={submit} className={form} style={{ width: "100%" }}>
				<InputBase
					autoFocus
					onFocus={(e) => e.target.select()}
					onBlur={handleBlur}
					onChange={handleInputText}
					id="standard-error-helper-text"
					defaultValue={listTitle}
					fullWidth
					className={input}
					inputProps={{
						"aria-label": "edit title",
					}}
				/>
				<IconButton
					type="submit"
					className={iconButton}
					aria-label="confirm edit"
				>
					<CheckIcon />
				</IconButton>
				<Divider className={divider} orientation="vertical" />
				<IconButton
					onClick={() => setModalOpen(true)}
					className={iconButton}
					aria-label="delete list"
				>
					<DeleteIcon />
				</IconButton>
			</form>

			<Modal
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				title={`Would you like to delete the ${listTitle} list?`}
				content={
					"Confirming this action all posts in the list will also be deleted."
				}
				handleConfirmation={handleDeleteConfirmation}
			/>
		</>
	);
};

export default React.memo(EditList);
