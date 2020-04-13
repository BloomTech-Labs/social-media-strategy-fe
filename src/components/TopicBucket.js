import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ActionButton from "./ActionButton";
import { fetchTopics, updateTopics } from "../actions";

const Container = styled.div`
  background-color: #ebecf0;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 1rem;
  text-align: center;
`;
const Title = styled.h4`
  color: white;
  background-color: #e85556;
  font-size: 1.6rem;
  width: 100%;
  padding: 1.5rem 0rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  margin: 0;
`;
const CardList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100px;
  background-color: #ebecf0;
  width: 20rem;
  border-radius: 0.5rem;
`;

// style={{if(props.topic.title) == "Drafts"}}

const TopicBucket = (props) => {
  let scrollCondition = props.cards.length > 4;
  let hi = document.querySelectorAll("#topic-scroll"); // TESTING PURPOSES

  useEffect(() => {
    props.fetchTopics(props.user.currentUser);
  }, [scrollCondition]); // updates state on load

  // useEffect(() => {
  //   props.updateTopics(props.userID, props.topics);
  // }, []);

  return (
    <>
      <Draggable draggableId={String(props.topic.id)} index={props.index}>
        {(provided) => (
          <Container
            className={`${props.className} `}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={String(props.topic.id)} type="card">
              {(provided) => (
                <>
                  {console.log(props.cards.length > 3, "PROVIDED")}
                  {scrollCondition ? (
                    <>
                      <Title>{props.topic.title}</Title>
                      <CardList
                        id="topic-scroll"
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
                      </CardList>
                    </>
                  ) : (
                    <>
                      <Title>{props.topic.title}</Title>
                      <CardList
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
                      </CardList>
                    </>
                  )}

                  {/* <CardList
                    // id={`hi-${props.topic.id}`}
                    // className="TOPICCONTAINER"
                    id="hi"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
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
                  </CardList> */}

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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    topics: state.topics,
  };
};

export default connect(mapStateToProps, { fetchTopics, updateTopics })(
  TopicBucket
);
