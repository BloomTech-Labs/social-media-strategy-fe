import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "../sass/topicBuckets.scss";

const Container = styled.div`
  background-color: grey;
  width: 90%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.75rem;
`;

const TopicCard = props => {
  return (
    <Draggable draggableId={props.card.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.card.content}
        </Container>
      )}
    </Draggable>
  );
};

export default TopicCard;
