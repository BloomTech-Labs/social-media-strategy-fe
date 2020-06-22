import React, { useState, useEffect } from "react";
import { getScheduleList } from "../../actions/scheduleActions";
import { Droppable, Draggable } from "react-beautiful-dnd";
// Material-UI
import { makeStyles } from "@material-ui/core";

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
									{list.posts
										?.filter((post) => !post.posted)
										.sort((a, b) => {
											let dateA =
												a.index !== null && !a.scheduled_time
													? list.scheduleDates[a.index]
													: a.scheduled_time;
											let dateB =
												b.index !== null && !b.scheduled_time
													? list.scheduleDates[b.index]
													: b.scheduled_time;
											if (dateA < dateB) {
												return -1;
											}
											return 1;
										})
										.map((post) => (
											<Post
												key={post.id}
												post={post}
												date={list.scheduleDates[post.index]}
											/>
										))}
									<CreatePostButton listId={list.id} />
								</Scrollbars>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default React.memo(List);
