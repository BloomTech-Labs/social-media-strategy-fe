import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core";
import { getDate, getTime } from "../../utils/dateFunctions";
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
						{date && !post.schedule && post.index !== null && (
							<p>{`${getDate(date)} | ${getTime(date)}`}</p>
						)}
						<PostContent post={post} />
					</div>
				)}
			</Draggable>
		)
	);
};

export default React.memo(Post);
