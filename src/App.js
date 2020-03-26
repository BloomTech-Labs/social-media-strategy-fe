import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { onDragEndSingle, onDragEndDouble } from "./actions/topicAction";

import styled from 'styled-components';

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

const TopicsContainer = styled.div`
  display: flex;
  justify: space-evenly;
`;


const App = props => {

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
  
    if (!destination){
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
  
    const topicStart = props.topics[source.droppableId];
    const topicFinish = props.topics[destination.droppableId];

    if (topicStart === topicFinish) {
      const newCardsIds = Array.from(topicStart.cardsIds);

    newCardsIds.splice(source.index, 1);
    newCardsIds.splice(destination.index, 0, draggableId);

    const newTopic = {
      ...topicStart,
      cardsIds: newCardsIds
    };

    props.onDragEndSingle(newTopic);
    return;
    } // if same topic 
    
    // Moving from one topic to another
    const startCardsIds = Array.from(topicStart.cardsIds);
    startCardsIds.splice(source.index, 1);
    const newStart = {
      ...topicStart,
      cardsIds: startCardsIds
    };

    const finishCardsIds = Array.from(topicFinish.cardsIds);
    finishCardsIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...topicFinish,
      cardsIds: finishCardsIds
    }

    props.onDragEndDouble(newStart, newFinish);
    
  }

  return (
    <div className='container'>
      {/*<div className="nav" >
      <Navigation />
      </div>
      <div className="dash">
      <Dashboard />
      </div>*/}
      <TopicsContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='topics'>
          {props.topicOrder.map(topicId => {
            const topic = props.topics[topicId]; // pulls a topic from state
            const cards = topic.cardsIds.map(cardId => props.cards[cardId]); // pulls that topics cards from state

            return <TopicBucket key={topic.id} topic={topic} cards={cards} />;
          })}
        </div>
      </DragDropContext>
      </TopicsContainer>
    </div>
  );
};

const mapStateToProps = state => ({
  topics: state.topics.topics,
  cards: state.topics.cards,
  topicOrder: state.topics.topicOrder
});

export default connect(mapStateToProps, { onDragEndSingle, onDragEndDouble })(App);
