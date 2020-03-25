import React from "react";
import TopicCard from "./TopicCard";
import { Droppable } from "react-beautiful-dnd";

const TopicBucket = props => {
  return (
    <Droppable droppableId={String(props.id)}>
      {provided => (
        <div
          className='eachBucket'
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
            <h4>{props.title}</h4>
            {props.cards.map((card, index) => (
            <TopicCard text={card.text} id={card.id} index={index} />
        ))}
            {provided.placeholder}
        </div>
    )}
    </Droppable>
  );
};

export default TopicBucket;
