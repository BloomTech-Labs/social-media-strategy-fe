import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography, makeStyles } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import Post from './Post';

const useStyles = makeStyles((theme) => ({
	listContainer: {
		backgroundColor: theme.palette.background.default,
		height: 'fit-content',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		width: '300px'
	},
	header: {
		padding: theme.spacing(2),
	}
}));

const List = ({ listId, list }) => {
	const { listContainer, header } = useStyles();
	return (
		<Draggable key={list.id} draggableId={list.id} index={list.index}>
			{(provided, snapshot) => (
				<div
					className={listContainer}
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<div className={header} {...provided.dragHandleProps}>
						<Typography variant='h6' component='h3'>
							{list.name}
						</Typography>
					</div>
					<Droppable direction='vertical' droppableId={list.id} type='post'>
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{ background: snapshot.isDraggingOver ? 'lightblue' : '#FFF', height: '100%' }}
							>
								{/* <Scrollbars style={{height: '100%'}}> */}
									{list.posts?.map((post) => (
										<Post key={post.id} post={post} index={post.index} />
									))}
								{/* </Scrollbars> */}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default List;
