import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const CreatePostButton = ({ listId }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button
				style={{ height: 50 }}
				fullWidth
				color="primary"
				onClick={() => setIsOpen(true)}
			>
				<AddIcon size="small" color="disabled" />
			</Button>
			<CreatePostModal
				listId={listId}
				open={isOpen}
				handleClose={() => setIsOpen(false)}
			/>
		</>
	);
};

export default CreatePostButton;
