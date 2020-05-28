import React, { useState } from "react";
import TopicCard2 from "./TopicCard2";
import dummyTopics from "./initialData";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";

const TopicBucket2 = () => {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    // TODO: fetch data from backend instead
    setTopics(dummyTopics);
  }, []);

  const onDragEnd = (result) => {
    if(!result.destination) return;
    const { source, destination } = result;

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
        [source.droppableId]: {
            ...sourceTopic,
            items: sourceItems
        },
        [destination.droppableId]: {
          ...destTopic,
          items: destItems
        }
      });
    } else {
      const topic = topics[source.droppableId];
      const copyItems = [...topic.items];
      // remove item
      const [item] = copyItems.splice(source.index, 1);
      // add item to new index
      copyItems.splice(destination.index, 0 , item);
      setTopics({
        ...topics,
        [source.droppableId]: {
          ...topic,
          items: copyItems
        }
      });
    }
  }

  return (topics &&
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.entries(topics).map(([topicId, topic]) => { 
        return (
          <div key={topicId}>
          <Typography variant='h6' component='h3'>{topic.name}</Typography>
          <Droppable droppableId={topicId}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                padding: 4,
                width: 250
              }}>
                {topic?.items?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 16,
                          margin: '0 0 8px 0',
                          minHeight: '50px',
                          backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                          color: 'white',
                          ...provided.draggableProps.style
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
        </Droppable>
        </div>)
      })}
      {/* {this.state.topicOrder.map((topicId) => {
        const topic = this.state.topics[topicId];
        const tweets = topic.tweets.map((tweet) => (tweet = { tweet }));
        return <TopicCard2 key={topic.id} topic={topic} tweets={tweets} />;
      })} */}
    </DragDropContext>
  );
  
}
export default TopicBucket2;
