import React, { useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core';

import List from './List';

import { 
	dragPostToDifferentList,
	dragPostToSameList,
	dragList,
	loadListsFromDb
} from '../../actions';

const useStyles = makeStyles(theme => ({
	kanban: {
		display: 'flex',
		height: 'calc(100vh - 170px)'
	}
}))

const Kanban = () => {
	const { lists } = useSelector(state => state.kanban);
	const user = useSelector(state => state.user);

	const { kanban } = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.okta_uid) {
			if (!lists) {
				console.log('loading lists');
				(async () => {
					dispatch(await loadListsFromDb(user.okta_uid));
				})();
				
			}
		}
	}, [user]);

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