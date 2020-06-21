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

const Post = ({ post }) => {
	const { container } = useStyles();

	return (
		post &&
		(post.index !== null ? (
			<Draggable key={post.id} draggableId={post.id} index={post.index}>
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
		) : (
			<div className={container}>
				<PostContent post={post} />
			</div>
		))
	);
};

export default React.memo(Post);
