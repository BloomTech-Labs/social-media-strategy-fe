import React from "react";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ActionButton from "./ActionButton";


const Container = styled.div`
  background-color: #817BAB;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 1rem;
`;
const Title = styled.h4`
  color: white;
  font-size: 1.6rem;
`;
const CardList = styled.div`
  padding:1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100px;
  background-color: #F5F7F8;
  width: 18rem;
  border-radius: .5rem;
`;


const TopicBucket = (props) => {
  
  const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
  return (
    <>
      <Draggable draggableId={String(props.topic.id)} index={props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            >
            <ActionButton topicId={props.topicId} />
            <Droppable droppableId={String(props.topic.id)} type='card'>
              {(provided) => (
                <CardList ref={provided.innerRef} {...provided.droppableProps}>
                  <Header>
                  <Title>{props.topic.title}</Title>
                  </Header>
                  {props.cards.map((card, index) => (
                    <TopicCard
                      key={card.id}
                      card={card}
                      index={index}
                      id={card.id}
                    />
                  ))}
                  {provided.placeholder}
                </CardList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    </>
  );
};

export default TopicBucket;
