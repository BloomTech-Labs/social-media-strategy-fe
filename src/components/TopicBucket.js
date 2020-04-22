import React, { useState } from "react";
import { connect } from "react-redux";
import TopicCard from "./TopicCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ActionButton from "./ActionButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import {
  fetchTopics,
  updateTopics,
  deleteTopics,
  editTopic
} from "../actions";

const TopicBucket = props => {
  const [content, setcontent] = useState({ name: props.topic.title });
  const [editing, setediting] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.editTopic(props.topid.id, content.name)
    setcontent({ name: content.name })
    setediting(!editing)
  };

  let scrollCondition = props?.cards?.length > 4;

  return (
    <>
      <Draggable draggableId={String(props.topic.id)} index={props.index}>
        {provided => (
          <div
            className={`${props.className} container`}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={String(props.topic.id)} type="card">
              {provided => (
                <>
                  {scrollCondition ? (
                    <>
                      <div className='title'>
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
                            <CreateIcon onClick={() => setediting(!editing)} />
                            {!editing ? (
                              props.topic.title // if not editing show this
                            ) : (
                              // else show this
                              <>
                                <form onSubmit={submitForm}>
                                  <input
                                    type="text"
                                    name="name"
                                    value={content.name}
                                    onChange={handleChange}
                                    defaultValue={props.topic.title}
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
                      </div>

                      <div className='cardlist'
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
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className='title'>
                        {props.topic.title !== "Drafts" ? (
                          <span className="editTopics">
                            <span className="topicIcons">
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
                                onClick={() => setediting(!editing)}
                              />
                            </span>
                            {!editing ? (
                              <span className="topicTitle">
                                {props.topic.title}
                              </span>
                            ) : (
                              <>
                                <form onSubmit={submitForm}>
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
                      </h4>
                      <div className='cardlist'
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
                      </div>
                    </>
                  )}
                  <ActionButton topicId={props.topicId} />
                </>
              )}
            </Droppable>
          </div>
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
  editTopic
})(TopicBucket);
