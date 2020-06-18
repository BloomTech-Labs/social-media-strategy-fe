import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/listsActions";
import Modal from "../templates/Modal";
// Material-UI
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Menu,
} from "@material-ui/core";
// Material-UI icons
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const PostMenu = ({ post, setEditing }) => {
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);

	const handleAnchorEl = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		setEditing();
	};

	const handleDeleteClick = () => {
		setModalOpen(true);
		handleClose();
	};

	const handleDeleteConfirmation = async () => {
		dispatch(deletePost(post));
		handleClose();
	};

	return (
		<>
			<Modal
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				title="Delete this post?"
				handleConfirmation={handleDeleteConfirmation}
			/>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleAnchorEl}
				color="inherit"
			>
				<MoreHorizIcon fontSize="small" />
			</IconButton>

			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={isOpen}
				onClose={handleClose}
			>
				{!post.posted && (
					<MenuItem onClick={handleEdit}>
						<ListItemIcon>
							<EditIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Edit" />
					</MenuItem>
				)}
				<MenuItem onClick={handleDeleteClick}>
					<ListItemIcon>
						<DeleteIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Delete" />
				</MenuItem>
			</Menu>
		</>
	);
};

export default PostMenu;
