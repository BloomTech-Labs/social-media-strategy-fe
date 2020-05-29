import React, { useState } from "react";
import TopicCard2 from "./TopicCard2";
import { dummyTopics, dummyPosts } from "./initialDataArray";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";

const getPostsByTopic = topicId => {
  return dummyPosts.map(post => post.topicId === topicId);
}

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};

const sortArrayByIndex = (array) => {
  return array.sort((a,b) => a.index > b.index ? 1 : -1);
}


const Topic = () => {
  return <h1>Topic</h1>;
}

const TopicBucket2 = () => {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    // TODO: fetch data from backend instead
    // set topicts sorted by index
    const topicsWithPosts = dummyTopics.map(topic => ({
      ...topic,
      posts: getPostsByTopic(topic.id)
    }));

    const topicsPostsObj = convertArrayToObject(topicsWithPosts, 'id');
    
    setTopics(topicsPostsObj);
  }, []);

  const onDragEnd = (result) => {
    if(!result.destination) return;
    const { source, destination } = result;

    // if drag post to a different topic/column
    if (source.droppableId !== destination.droppableId) {
      const sourceTopic = topics[source.droppableId];
      const destTopic = topics[destination.droppableId];

      const sourcePosts = [...sourceTopic.posts];
      const destPosts = [...destTopic.posts];

      // remove post from source topic
      const [post] = sourcePosts.splice(source.index, 1);
      // add post to destination topic
      destPosts.splice(destination.index, 0, post);
      setTopics({
        ...topics,
        [source.droppableId]: {
            ...sourceTopic,
            posts: sourcePosts
        },
        [destination.droppableId]: {
          ...destTopic,
          posts: destPosts
        }
      });
    } else {
      const topic = topics[source.droppableId];
      console.log(topic);
      const copyPosts = [...topic.posts];
      // remove post
      const [post] = copyPosts.splice(source.index, 1);
      // add post to new index
      copyPosts.splice(destination.index, 0 , post);
      setTopics({
        ...topics,
        [source.droppableId]: {
          ...topic,
          posts: copyPosts
        }
      });
    }
  }

  console.log('***topics****', topics);

  return ( Object.keys(topics).length !== 0 &&
    <DragDropContext onDragEnd={result => console.log(result)}>
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
                  {topic?.posts?.map((post, index) => (
                    <Draggable key={post.id} draggableId={post.id} index={post.index}>
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
                          {post.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                )}
              </Droppable>
          </div>
        )
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
