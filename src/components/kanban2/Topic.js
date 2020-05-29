import React from 'react';
import { Typography } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Post from './Post';

const Topic = ({ topicId, topic }) => {
	return (
		<Draggable key={topicId} draggableId={topicId} index={topic.index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Typography {...provided.dragHandleProps} variant='h6' component='h3'>
						{topic.name}
					</Typography>
					<Droppable direction='vertical' droppableId={topicId} type='post'>
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{
									background: snapshot.isDraggingOver
										? 'lightblue'
										: 'lightgray',
									padding: 4,
									width: 250,
								}}
							>
								{topic?.items?.map((item) => (
									<Post key={item.id} item={item} index={item.index} />
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default Topic;
