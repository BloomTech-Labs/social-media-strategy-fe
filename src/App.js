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

    if (!destination) {
      return;
    } // if no destination, no action is needed

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    };
    // has the location of the draggable changed?
    
    //this.props.dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId))
  }; 

  return (
    <div className='container'>
      {/*<div className="nav" >
      <Navigation />
      </div>
      <div className="dash">
      <Dashboard />
      </div>*/}
      {props.topicOrder.map((topicId) => {
        const topic = props.topics[topicId];
        const cards = topic.cardsIds.map(cardId => props.cards[cardId]);

        return topic.title;
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  topics: state.topics.topics,
  cards: state.topics.cards,
  topicOrder: state.topics.topicOrder
});

export default connect(mapStateToProps, { sort })(App);
