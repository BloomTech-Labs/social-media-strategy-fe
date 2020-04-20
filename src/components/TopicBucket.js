import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ActionButton from "./ActionButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import {
  fetchTopics,
  updateTopics,
  deleteTopics,
  editTopicTitle
} from "../actions";
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
const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const TopicBucket = props => {
  const [content, setcontent] = useState({ name: "" });
  const [editing, setediting] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  let scrollCondition = props?.cards?.length > 4;

  return (
    <>
      <Draggable draggableId={String(props.topic.id)} index={props.index}>
        {provided => (
          <Container
            className={`${props.className} `}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={String(props.topic.id)} type="card">
              {provided => (
                <>
                  {scrollCondition ? (
                    <>
                      <Title>
                        {props.topic.title !== "Drafts" ? (
                          <span>
                            <span className={`deleteTopic`}>
                              <DeleteIcon
                                style={{ "margin-right": "20" }}
                                onClick={() =>
                                  props.deleteTopics(props.topic.id)
                                }
                              />
                            </span>
                            <CreateIcon
                              // onClick={() => props.editCard(props.card.id, content)}
                              onClick={() => setediting(!editing)}
                            />
                            {!editing ? (
                              props.topic.title
                            ) : (
                              <>
                                <form
                                  onSubmit={() =>
                                    props.editTopicTitle(
                                      props.topic.id,
                                      content.name
                                    )
                                  }
                                >
                                  <input
                                    type="text"
                                    name="name"
                                    value={content.name}
                                    onChange={handleChange}
                                  />
                                  &nbsp;{" "}
                                  <span
                                    onClick={() => setediting(!editing)}
                                    style={{
                                      color: "red",
                                      fontWeight: "bolder",
                                      padding: "5px"
                                    }}
                                  >
                                    x
                                  </span>
                                </form>
                              </>
                            )}
                          </span>
                        ) : (
                          props.topic.title
                        )}
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
                          <span>
                            <span className={`deleteTopic`}>
                              <DeleteIcon
                                style={{ "margin-right": "20" }}
                                onClick={() =>
                                  props.deleteTopics(props.topic.id)
                                }
                              />
                            </span>
                            <CreateIcon
                              className={`editTopic`}
                              // onClick={() => props.editCard(props.card.id, content)}
                              onClick={() => setediting(!editing)}
                            />
                            {!editing ? (
                              props.topic.title
                            ) : (
                              <>
                                <form
                                  onSubmit={() =>
                                    props.editTopicTitle(
                                      props.topic.id,
                                      content.name
                                    )
                                  }
                                >
                                  <input
                                    type="text"
                                    name="name"
                                    value={content.name}
                                    onChange={handleChange}
                                  />
                                  &nbsp;{" "}
                                  <span
                                    onClick={() => setediting(!editing)}
                                    style={{
                                      color: "red",
                                      fontWeight: "bolder",
                                      padding: "5px"
                                    }}
                                  >
                                    x
                                  </span>
                                </form>
                              </>
                            )}
                          </span>
                        ) : (
                          props.topic.title
                        )}
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

const mapStateToProps = state => {
  return {
    user: state.user,
    topics: state.topics
  };
};

export default connect(mapStateToProps, {
  deleteTopics,
  fetchTopics,
  updateTopics,
  editTopicTitle
})(TopicBucket);
