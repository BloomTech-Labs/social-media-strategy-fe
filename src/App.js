import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "./actions";

//import Dashboard from "./components/Dashboard";
//import Navigation from "./components/Navigation";
import TopicBucket from "./components/TopicBucket";

import "./sass/index.scss";

//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/*const routes = (
  <Router>
    <Switch>
      <Route path="/add-acct" component={AddAccount} />
    </Switch>
  </Router>
)*/

const App = props => {
  


  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    const mapDispatchToProps = dispatch => {
      sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId)
    }

    if (!destination) {
      return;
    }

   mapDispatchToProps();


  }; // end onDragEnd

  const { topics } = props;

  return (
    <div className='container'>
      {/*<div className="nav" >
      <Navigation />
      </div>
      <div className="dash">
      <Dashboard />
      </div>*/}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='topics'>
          {topics.map((topic, index) => (
            <TopicBucket title={topic.title} cards={topic.cards} index={index} id={topic.id}/>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = state => ({
  topics: state.topics
});

export default connect(mapStateToProps, { sort })(App);
