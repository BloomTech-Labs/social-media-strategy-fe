import React, { useState } from 'react';
import TopicCard2 from './TopicCard2';
import dummyTopics from './initialData';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Topic from './Topic';

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};

const TopicBucket2 = () => {
	const [topics, setTopics] = useState({});

	useEffect(() => {
		// TODO: fetch data from backend instead
		setTopics(dummyTopics);
	}, []);

	const onDragEnd = (result) => {
		const { source, destination, dragabbleId, type } = result;

		if (!result.destination) {
			return;
		}

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		if (type === 'post') {
			// if drag item to a different topic/column
			if (source.droppableId !== destination.droppableId) {
				const sourceTopic = topics[source.droppableId];
				const destTopic = topics[destination.droppableId];

				const sourceItems = [...sourceTopic.items];
				const destItems = [...destTopic.items];

				// remove item from source topic
				const [item] = sourceItems.splice(source.index, 1);
				// add item to destination topic
				destItems.splice(destination.index, 0, item);
				setTopics({
					...topics,
					// Update items/posts of the source column/topic
					[source.droppableId]: {
						...sourceTopic,
						items: sourceItems.map((element) => ({
							...element,
							// update each item's index
							index: sourceItems.findIndex((el) => el.id === element.id),
						})),
					},
					// Update items/posts of the destination column/topic
					[destination.droppableId]: {
						...destTopic,
						items: destItems.map((element) => ({
							...element,
							// update each item's index
							index: destItems.findIndex((el) => el.id === element.id),
						})),
					},
				});
			} else {
				const topic = topics[source.droppableId];
				const copyItems = [...topic.items];
				// remove item
				const [item] = copyItems.splice(source.index, 1);
				// add item to new index
				copyItems.splice(destination.index, 0, item);
				setTopics({
					...topics,
					[source.droppableId]: {
						...topic,
						items: copyItems.map((element) => ({
							...element,
							index: copyItems.findIndex((el) => el.id === element.id),
						})),
					},
				});
			}
		} else if (type === 'topic') {
      const topicsArray = Object.values(topics)
        .sort((a,b) => a.index - b.index);
      const [column] = topicsArray.splice(source.index, 1);
      topicsArray.splice(destination.index, 0, column);

      console.log(topicsArray);

      const updatedTopicsIndexes = topicsArray.map(topic => ({
        ...topic,
        index: topicsArray.findIndex(el => el.id === topic.id)
      }));

      setTopics(convertArrayToObject(updatedTopicsIndexes, 'id'));
    }
	};

	return (
		topics && (
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					direction='horizontal'
					droppableId='mainDroppable'
					type='topic'
				>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{
								display: 'flex',
								width: '100%',
								height: '100%',
								justifyContent: 'flexStart',
								alignItems: 'flexStart',
							}}
						>
							{Object.entries(topics).map(([topicId, topic]) => (
								<Topic topicId={topicId} topic={topic} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		)
	);
};
export default TopicBucket2;

{
	/* {this.state.topicOrder.map((topicId) => {
  const topic = this.state.topics[topicId];
  const tweets = topic.tweets.map((tweet) => (tweet = { tweet }));
  return <TopicCard2 key={topic.id} topic={topic} tweets={tweets} />;
})} */
}
