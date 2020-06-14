import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@material-ui/core";

const ModalAlert = (props) => {
	const { open, setOpen, title, content, handleConfirmation } = props;
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="dialog-title"
		>
			<div style={{ minWidth: 300 }}>
				<DialogTitle id="dialog-title">{title}</DialogTitle>
				{content && (
					<DialogContent>
						<DialogContentText id="dialog-description">
							{content}
						</DialogContentText>
					</DialogContent>
				)}

				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
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

export default ModalAlert;
