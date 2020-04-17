import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, fetchTopics, updateTopics, currentUser } from '../actions';
import styled from 'styled-components';

import Dashboard from './Dashboard';
import Navigation from './Navigation';
import TopicBucket from './TopicBucket';
import ActionButton from './ActionButton';
import TopicNav from './TopicNav';

import '../sass/index.scss';
import { Route, Switch } from 'react-router';
import Callback from './Callback';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';

const TopicsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const HomePage = (props) => {
  let userCheck = props?.user?.currentUser === null;

  let topicLength = props?.topics?.length;

  async function updateAlltopics() {
    let test = await props?.topics?.forEach(async (e, i) => {
      await axiosWithAuth()
        .put(`/topics/${e.id}`, { ...e, index: i })
        .then((res) => console.log(res, '???'))
        .catch((err) => console.log(err) & console.log(props.topics, 'TOPICS'));
    });
    return test;
  }

  // useEffect(() => {
  //   window.location.reload(false);
  // }, []);

  useEffect(() => {
    props.currentUser();
    props.fetchTopics(props.user.currentUser?.subject);
  }, [userCheck]);

  let updateTrue = props.user.didUpdate === true;
  useEffect(() => {
    props.updateTopics(updateAlltopics);
  }, [updateTrue]);
  console.log('USERUPDATED', props.user.didUpdate);
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

      <Route exact path="/callback">
        <Callback />
      </Route>
      <Switch>
        <Route path="/">
          <div className="column is-3">
            <Dashboard />
          </div>
          <div className="column drag-drop-content">
            <TopicNav />
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
                      {/* {props.user.isLoading && (
                        <Loader
                          type="BallTriangle"
                          color="#00BFFF"
                          height={100}
                          width={100}
                          timeout={3000}
                        />
                      )} */}
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
