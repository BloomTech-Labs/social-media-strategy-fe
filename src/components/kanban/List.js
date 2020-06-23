import React from "react";
import { getDate, getTime } from "../../utils/dateFunctions";
import { Droppable, Draggable } from "react-beautiful-dnd";
// Material-UI
import { makeStyles, Typography } from "@material-ui/core";

import { Scrollbars } from "react-custom-scrollbars";
import ListHeader from "./ListHeader";
import Post from "./Post";
import CreatePostButton from "./CreatePostButton";

const useStyles = makeStyles((theme) => ({
	listContainer: {
		backgroundColor: "transparent",
		height: "fit-content",
		marginLeft: theme.spacing(2),
		width: 275,
		minWidth: 275,
	},
	postsContainer: {
		overflow: "hidden",
		height: `calc(100vh - ${theme.kanban.topContainer.height} - ${
			theme.kanban.list.header.height
		} - ${theme.spacing(2)}px) !important`,
	},
}));

const List = ({ list }) => {
	const { listContainer, postsContainer } = useStyles();

	return (
		<Draggable key={list.id} draggableId={list.id} index={list.index}>
			{(provided, snapshot) => (
				<div
					className={listContainer}
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<ListHeader list={list} dragHandleProps={provided.dragHandleProps} />
					<Droppable direction="vertical" droppableId={String(list.id)} type="post">
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className={postsContainer}
								style={{
									background: snapshot.isDraggingOver ? "aliceblue" : "transparent",
								}}
							>
								<Scrollbars autoHide>
									{list.posts.map((post) => (
										<>
											{list.scheduleDates[post.index] && (
												<>
													<Typography variant="caption">{`${getDate(
														list.scheduleDates[post.index],
													)} | ${getTime(list.scheduleDates[post.index])}`}</Typography>
												</>
											)}

											<Post key={post.id} post={post} />
										</>
									))}
									{provided.placeholder}
									<CreatePostButton listId={list.id} />
								</Scrollbars>
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default React.memo(List);
