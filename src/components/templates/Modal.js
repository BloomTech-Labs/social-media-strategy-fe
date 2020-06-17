import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@material-ui/core";

const Modal = (props) => {
	const { open, handleClose, title, content, handleConfirmation } = props;
	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
			<div style={{ minWidth: 300 }}>
				<DialogTitle id="dialog-title">{title}</DialogTitle>

				<DialogContent>
					{props.children ? (
						<>{props.children}</>
					) : (
						content && (
							<DialogContentText id="dialog-description">
								{content}
							</DialogContentText>
						)
					)}
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					{handleConfirmation && (
						<Button onClick={handleConfirmation} color="primary" autoFocus>
							Confirm
						</Button>
					)}
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default Modal;
