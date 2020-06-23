import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core";
// Components
import PostContent from "./PostContent";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingBottom: theme.spacing(1),
		paddingTop: theme.spacing(1),
		marginTop: 4,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FFF",
	},
}));

const Post = ({ post, date }) => {
	const { container } = useStyles();

	return (
		post && (
			<Draggable
				disableInteractiveElementBlocking={false}
				isDragDisabled={post.index === null}
				key={post.id}
				draggableId={post.id}
				index={post.index}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={container}
						style={{ ...provided.draggableProps.style }}
					>
						<PostContent post={post} />
					</div>
				)}
			</Draggable>
		)
	);
};

export default React.memo(Post);
