import React from "react";
import { connect } from "react-redux";
import TopicCard from "./TopicCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ActionButton from "./ActionButton";
import TopicTitle from "./TopicTitle";

import { fetchTopics, updateTopics, deleteTopics, editTopic } from "../actions";

const TopicBucket = (props) => {
  let scrollId = "";
  if (props?.cards?.length > 4) {
    scrollId = "topic-scroll";
  }

  return (
    <Draggable draggableId={String(props.topic.id)} index={props.index}>
      {(provided) => (
        <div
          className={`${props.className} container`}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(props.topic.id)} type='card'>
            {(provided) => (
              <>
                <TopicTitle topic={props.topic} />
                <div
                  className='cardlist'
                  id={scrollId}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {props.cards.map((card, index) => (
                    <TopicCard
                      className={`${card.id}`}
                      key={card.id}
                      card={card}
                      index={index}
                      id={card.id}
                    />
                  ))}
                  {provided.placeholder}
                </div>
                <ActionButton topicId={props.topicId} />
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    topics: state.topics,
  };
};

export default connect(mapStateToProps, {
  deleteTopics,
  fetchTopics,
  updateTopics,
  editTopic,
})(TopicBucket);