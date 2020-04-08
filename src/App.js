import React from "react";
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
    <div className='columns is-gapless'>
      <div className='column is-2'>
        <Navigation />
      </div>
      <Route exact path='/callback'>
        <Callback />
      </Route>
      <Switch>
        <Route path='/login'>
          <REGISTER_LOGIN />
        </Route>
      </Switch>
      <div className='column is-3'>
        <Dashboard />
      </div>
      <div className='column drag-drop-content'>
        <div className='column select-a-header'>
          <h1 className='headers'>Buckets</h1>
          <h3 className='unselected-headers'>Social Board Queue</h3>
          <h3 className='unselected-headers'>Analytics</h3>
        </div>
      <ActionButton className="column is-2 headers" topic />
      <DragDropContext onDragEnd={onDragEnd}>

        <Droppable className="columns" droppableId='all-topics' direction='horizontal' type='topic'>
          {provided => (
            <TopicsContainer
              // style={{"overflow":"scroll"}}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >

              <div className='column topics'>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  topics: state.topics,
});

export default connect(mapStateToProps)(App);
