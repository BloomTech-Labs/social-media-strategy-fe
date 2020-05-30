import React from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core';

import List from './List';

import { 
	dragPostToDifferentList,
	dragPostToSameList,
	dragList
} from '../../actions/posts';

const useStyles = makeStyles(theme => ({
	kanban: {
		// height: 'calc(100% - 2px)',
		display: 'flex',
		// maxHeight: '100%',
	}
}))

const Kanban = () => {
	const { lists } = useSelector(state => state.posts);
	const { kanban } = useStyles();
	const dispatch = useDispatch();

	const onDragEnd = (result) => {
		const { source, destination, dragabbleId, type } = result;

		if (!result.destination || 
		(source.droppableId === destination.droppableId &&
		source.index === destination.index)) {
			return;
		} 

		if (type === 'post') {
			if (source.droppableId !== destination.droppableId) {
				// if drag post to a different list/column
				dispatch(dragPostToDifferentList(lists, source, destination));
			} else {
				// if drag post to the same list/column
				dispatch(dragPostToSameList(lists, source, destination));
			}
		} else if (type === 'list') {
			// if drag list
			dispatch(dragList(lists, source, destination));
		}
	};

	return ( lists && (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				direction='horizontal'
				droppableId='mainDroppable'
				type='list'
			>
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={kanban}
					>
						{Object.entries(lists).sort((a,b) => a.index - b.index).map(([listId, list]) => (
							<List key={list.id} listId={listId} list={list} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	));
};
export default Kanban;