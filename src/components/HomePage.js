import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, fetchTopics, updateTopics, currentUser } from "../actions";
import styled from "styled-components";

import Dashboard from "./Dashboard";
import Navigation from "./Navigation";
import TopicBucket from "./TopicBucket";
import ActionButton from "./ActionButton";

import "../sass/index.scss";
import { Route, Switch } from "react-router";
import Callback from "./Callback";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { bindActionCreators } from "redux";
import Axios from "axios";
import Loader from "react-loader-spinner";

const TopicsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const HomePage = (props) => {
  let card = [
    {
      cards: [
        { id: `card-${22}`, content: "This is content from card 1" },
        { id: `card-${0}`, content: "This is content from card 1" },
      ],
    },
  ];

  let testbutton = (e) => {
    e.preventDefault();
    axiosWithAuth()
      // Axios
      // Axios
      .post(`/topics/${props.user.currentUser}/user`, props.topics)

      // .post(`http://localhost:5000/api/topics/${1}/user`, props.topics)
      // .put(`http://localhost:5000/api/topics/${props.topics[0].id}`, {
      //   cards: props.topics[0].cards,
      // })
      .then((res) => console.log(res, "???"))
      .catch((err) => console.log(err) & console.log(props.topics, "TOPICS"));
  };

  let userCheck = props?.user?.currentUser === null;

  let topicLength = props?.topics?.length;

  useEffect(() => {
    props.currentUser();
    props.fetchTopics(props.user.currentUser?.subject);
  }, [userCheck]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    } // if there is no destination, nothing needs to be done
    props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  return (
    <div className="columns is-gapless">
      <div className="column is-2">
        <Navigation />
      </div>

      <button onClick={testbutton}>BUTTTTTTTOOOON</button>
      {console.log(props.topics.length, "TESTING")}

      <Route exact path="/callback">
        <Callback />
      </Route>
      <Switch>
        <Route path="/">
          <div className="column is-3">
            <Dashboard />
          </div>
          <div className="column drag-drop-content">
            <div className="column select-a-header">
              <h1 className="headers">Buckets</h1>
              <h3 className="unselected-headers">Social Board Queue</h3>
              <h3 className="unselected-headers">Analytics</h3>
            </div>
            <ActionButton className="column is-2 headers" topic />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                className="columns"
                droppableId="all-topics"
                direction="horizontal"
                type="topic"
              >
                {(provided) => (
                  <TopicsContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="column topics">
                      {/* {console.log(props?.topics, "WHAT ARE You")} */}
                      {console.log(props.user.isLoading, "LOADING")}
                      {props.user.isLoading && (
                        <Loader
                          type="BallTriangle"
                          color="#00BFFF"
                          height={100}
                          width={100}
                          timeout={3000} //3 secs
                        />
                      )}
                      {props.topics && !props.user.isLoading && (
                        <>
                          {props?.topics?.map((topic, index) => (
                            <TopicBucket
                              className={`${topic.id}`}
                              key={topic.id}
                              topicId={topic.id}
                              topic={topic}
                              cards={topic.cards}
                              index={index}
                            />
                          ))}
                        </>
                      )}
                    </div>
                    {provided.placeholder}
                  </TopicsContainer>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  topics: state.topics,
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ fetchTopics, updateTopics, currentUser }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);