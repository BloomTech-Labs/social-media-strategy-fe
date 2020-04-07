import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "./actions";

import styled, { ThemeProvider } from "styled-components";

import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import TopicBucket from "./components/TopicBucket";
import ActionButton from "./components/ActionButton";

import "./sass/index.scss";

//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/*const routes = (
  <Router>
    <Switch>
      <Route path="/add-acct" component={AddAccount} />
    </Switch>
  </Router>
)*/

const TopicsContainer = styled.div`
  display: flex;
  justify: space-evenly;
`;

const App = (props) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    } // if there is no destination, nothing needs to be done

    props.dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId, type))
  };

  return (
    <div className='container'>
      <div className='nav'>
        <Navigation />
      </div>
      <div className='dash'>
        <Dashboard />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-topics' direction='horizontal' type='topic'>
          {(provided) => (
            <TopicsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className='topics'>
                {props.topics.map((topic, index) => (
                  <TopicBucket
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
      <ActionButton topic />
    </div>
  );
};

const mapStateToProps = (state) => ({
  topics: state.topics,
});

export default connect(mapStateToProps)(App);
