import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, fetchTopics, updateTopics, currentUser } from '../actions';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Dashboard from './Dashboard';
import Navigation from './Navigation';
import TopicBucket from './TopicBucket';
import ActionButton from './ActionButton';
import TopicNav from './TopicNav';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import '../sass/index.scss';
import { Route, Switch, useHistory } from 'react-router';
import Callback from './Callback';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';

const drawerWidth = 400;

const TopicsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const homeStyles = makeStyles((theme) => ({
  bucket: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  bucketShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const HomePage = (props) => {
  const { push } = useHistory();
  const st = homeStyles();
  const theme = useTheme();
  let userCheck = props?.user?.currentUser === null;
  let topicLength = props?.topics?.length;
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
    props.currentUser(push);
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
          {props.user.drawer ? (
            <div className="column is-3">
              <Dashboard />
            </div>
          ) : (
            <div className="column is-3" style={{ display: 'none' }}>
              <Dashboard />
            </div>
          )}
          <div className="column drag-drop-content">
            <TopicNav />
            <ActionButton className="column is-2 headers" topic />
            <DragDropContext
              onDragEnd={onDragEnd}
              style={{ display: 'block', overflow: 'auto' }}
            >
              <Droppable
                className="columns"
                droppableId="all-topics"
                direction="horizontal"
                type="topic"
                style={{ display: 'block', overflow: 'auto' }}
              >
                {(provided) => (
                  <TopicsContainer
                    className="ALL-TOPICS"
                    style={{ display: 'block', overflow: 'auto' }}
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
