import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ActionButton from "./ActionButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { fetchTopics, updateTopics, deleteTopics } from "../actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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

const TopicBucket = (props) => {
  let scrollCondition = props?.cards?.length > 4;

  let testbutton = (e) => {
    e.preventDefault();

    axiosWithAuth()
      // Axios
      // Axios
      // .post(`/topics/${props.user.currentUser}/user`, props.topics)

      // .post(`http://localhost:5000/api/topics/${1}/user`, props.topics)
      .put(`/topics/${props.topic.id}`, props.topic)
      .then((res) => console.log(res, "???"))
      .catch((err) => console.log(err) & console.log(props.topics, "TOPICS"));
  };

  // useEffect(() => {
  //   props.fetchTopics(props.user.currentUser);
  // }, []); // updates state on load

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
                  {scrollCondition ? (
                    <>
                      <Title
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {props.topic.title}
                        {props.topic.title !== "Drafts" ? (
                          <DeleteIcon
                            onClick={() => props.deleteTopics(props.topic.id)}
                          />
                        ) : null}
                      </Title>
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
                      <Title>
                        {props.topic.title !== "Drafts" ? (
                          <DeleteIcon
                            onClick={() => props.deleteTopics(props.topic.id)}
                          />
                        ) : null}

                        {props.topic.title}
                      </Title>
                      <CardList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {props?.cards?.map((card, index) => (
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
                  {console.log(
                    props.topic.id,
                    props.topic.cards,
                    props.topic,
                    "TESTING PUT CARDS"
                  )}
                  <button onClick={testbutton}>HELLOOOO</button>

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

export default connect(mapStateToProps, {
  deleteTopics,
  fetchTopics,
  updateTopics,
})(TopicBucket);
