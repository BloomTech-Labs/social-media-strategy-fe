import React from "react";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ActionButton from "./ActionButton";

const Container = styled.div`
  background-color: #EBECF0;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 1rem;
  text-align: center;
`;
const Title = styled.h4`
  color: white;
  background-color:#E85556;
  font-size: 1.6rem;
  width: 100%;
  padding: 1.5rem 0rem;
  border-radius: .5rem .5rem 0rem 0rem;
  margin:0;
`;
const CardList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100px;
  background-color: #EBECF0;
  width: 20rem;
  border-radius: .5rem;
`;

// style={{if(props.topic.title) == "Drafts"}}

const TopicBucket = (props) => {

  return (
    <>
      <Draggable draggableId={String(props.topic.id)} index={props.index}>
        {provided => (
          <Container
            className={`${props.className}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            {/* <ActionButton topicId={props.topicId} /> */}

            <Droppable droppableId={String(props.topic.id)} type="card">
              {provided => (
                <>
                  <CardList ref={provided.innerRef} {...provided.droppableProps}>

                   
                      <Title>{props.topic.title}</Title>
                    
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
                  </CardList>

                  <ActionButton topicId={props.topicId} />
                </>
              )}
              {/* <ActionButton topicId={props.topicId} /> */}
            </Droppable>
          </Container>
        )}
      </Draggable>
    </>
  );
};

export default TopicBucket;
