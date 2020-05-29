/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, fetchTopics, updateTopics, currentUser } from "../actions";
import styled from "styled-components";
// import { makeStyles } from '@material-ui/core/styles';

import Dashboard from "./dashboard/Dashboard";
import Navigation from "./dashboard/Navigation";
import TopicBucket from "./kanban/TopicBucket";
import ActionButton from "./kanban/ActionButton";
import TopicNav from "./kanban/TopicNav";

import "../sass/index.scss";
import { Route, Switch, useHistory } from "react-router";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { bindActionCreators } from "redux";
import CONSTANTS from "../actions/constants";


// const drawerWidth = 400;

const TopicsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const HomePage = (props) => {
  const { push } = useHistory();

  let userCheck = props?.user?.currentUser === null;

  const refTime = useRef(0);

  async function updateAlltopics() {
    if (refTime.current === 0) {
      refTime.current = 1;
      setTimeout(() => {
        refTime.current = 0;
        console.log(refTime, "INTERVALL");
      }, 5000);
    }
    let test = await props?.topics?.forEach(async (e, i) => {
      await axiosWithAuth()
        .put(`/topics/${e.id}`, { ...e, index: i })
        .then((res) => console.log(res, "???"))
        .catch((err) => console.log(err) & console.log(props.topics, "TOPICS"));
    });
    return test;
  }

  let updateTrue = props.user.didUpdate === true;

  async function continousUpdate() {
    let countdown = setInterval(timer, 5000);

    function timer() {
      if (!updateTrue) {
        props.dispatch({ type: CONSTANTS.TOGGLEUPDATE, payload: true });
        setTimeout(() => {
          props.dispatch({ type: CONSTANTS.TOGGLEUPDATE, payload: false });
        }, 300);
        console.log(refTime, "Interval Cleared", new Date());
        clearInterval(countdown);
      } else {
        props.dispatch({ type: CONSTANTS.TOGGLEUPDATE, payload: false });

        clearInterval(countdown);
      }
    }
  }
  console.log(props.user.didUpdate, refTime, "INTERVAL");

  useEffect(() => {
    setInterval(() => {
      if (refTime.current === 0) {
        continousUpdate();
      }
    }, 25000);
    props.currentUser(push);
    props.fetchTopics(props.user.currentUser?.subject);
    props.updateTopics(updateAlltopics);
  }, [userCheck, updateTrue]);

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
      {/* <div className="column is-2">
        <Navigation />
      </div> */}

      <Route exact path="/">

      </Route>

      <Switch>
        <Route path="/">
          {/* {props.user.drawer ? (
            <div className="column is-3">
              <Dashboard />
            </div>
          ) : (
            <div className="column is-3" style={{ display: "none" }}>
              <Dashboard />
            </div>
          )} */}
          <div className="column drag-drop-content">
            <TopicNav />
            {/* <ActionButton className="column is-2 headers" {...props.topic} /> */}
            <DragDropContext
              onDragEnd={onDragEnd}
              style={{ display: "block", overflow: "auto" }}
            >
              <Droppable
                className="columns"
                droppableId="all-topics"
                direction="horizontal"
                type="topic"
                style={{ display: "block", overflow: "auto" }}
              >
                {(provided) => (
                  <TopicsContainer
                    className="ALL-TOPICS"
                    style={{ display: "block", overflow: "auto" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="column topics">
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
