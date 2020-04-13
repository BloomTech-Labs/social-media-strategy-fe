import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "./actions";
import styled from "styled-components";

import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import TopicBucket from "./components/TopicBucket";
import ActionButton from "./components/ActionButton";

import "./sass/index.scss";
import { Route, Switch } from "react-router";
import REGISTER_LOGIN from "./components/Register_Login";
import Callback from "./components/Callback";
// import PrivateRoute from "./utils/PrivateRoute";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { bindActionCreators } from "redux";

const TopicsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const App = (props) => {
  const [navigation, setNavigation] = React.useState(true);
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

  let locationCheck = useCallback((truthy) => {
    setNavigation(truthy);
    return window.location.pathname;
  }, []);

  // let locationCheck = (truthy) => {
  //   setNavigation(truthy);
  //   return window.location.pathname;
  // };
  const [state, setstate] = useState();
  useEffect(() => {
    console.log("Hello");
  }, [locationCheck, navigation]);
  useEffect(() => {
    console.log("testing");
    let card = {
      cards: [
        { id: `card-${22}`, content: "This is content from card 1" },
        { id: `card-${0}`, content: "This is content from card 1" },
      ],
    };
    axiosWithAuth()
      .put(`http://localhost:5000/api/topics/1`, card)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [props.topics]);

  return (
    <div className="columns is-gapless">
      {console.log(state, "STATE")}
      {navigation ? (
        <div className="column is-2">
          <Navigation />
        </div>
      ) : null}
      <Route exact path="/callback">
        <Callback />
      </Route>
      <Switch>
        <Route path="/login">
          <REGISTER_LOGIN locationCheck={locationCheck} />
        </Route>
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
                    // style={{"overflow":"scroll"}}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="column topics">
                      {props.topics.map((topic, index) => (
                        <TopicBucket
                          className={`${topic.id}`}
                          key={topic.id}
                          topicId={topic.id}
                          topic={topic}
                          cards={topic.cards}
                          index={index}
                        />
                      ))}
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}),
  };
}

const mapStateToProps = (state) => ({
  topics: state.topics,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
