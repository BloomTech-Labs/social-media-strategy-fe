import React from "react";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: white;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h4`
  color: gray;
  font-size: 1.6rem;
`;
const CardList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const TopicBucket = props => {
  return (
    <Container>
      <Title>{props.topic.title}</Title>
      <Droppable droppableId={props.topic.id}>
        {(provided) => (
          <CardList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.cards.map((card, index) => (
              <TopicCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
    </Container>
  );
};

export default TopicBucket;
