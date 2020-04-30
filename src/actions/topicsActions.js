import CONSTANTS from './constants';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const timeoutTime = 100;

export const onDragEndSingle = (newTopic) => (dispatch) => {
  dispatch({ type: CONSTANTS.ON_DRAG_END_SUCCESS, payload: newTopic });
  // post changes to the back end
};

export const onDragEndDouble = (newStart, newFinish) => (dispatch) => {
  dispatch({ type: CONSTANTS.ON_DRAG_END_SUCCESS, payload: newStart });
  dispatch({ type: CONSTANTS.ON_DRAG_END_SUCCESS, payload: newFinish });
  // post changes to the back end
};

export const onDragEndTopic = (newTopicOrder) => (dispatch) => {
  dispatch({
    type: CONSTANTS.ON_DRAG_TOPIC_END_SUCCESS,
    payload: newTopicOrder,
  });
};
// ADD TOPIC LOCAL
export const addTopic = (text, id, cuser) => (dispatch) => {
  dispatch({
    type: CONSTANTS.ON_ADD_TOPIC,
    payload: text,
    id: id,
  });
  dispatch(
    addTopics(cuser, { user_id: cuser, title: text, id: id, cards: [] })
  );
};

// POST CARD
const postCard = (text, id, cuser) => {
  const formattedPost = {
    id: id,
    user_id: Number(cuser.currentUser.subject),
    post_text: text,
    screenname: cuser.accounts[0].screen_name,
  };

  console.log('Formatted post', formattedPost);

  axiosWithAuth()
    .post(`/posts/${cuser.currentUser.subject}/user`, formattedPost)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error.message, 'FAIL');
      // dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
};

export const deletePostCard = (id) => {
  axiosWithAuth()
    .delete(`/posts/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error, 'FAIL');
    });
};

export const editPostCard = (id, content) => {
  axiosWithAuth()
    .put(`/posts/${id}`, { post_text: content })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error, 'FAIL');
    });
};

// THIS SHOULD BE A PUT -- IT IS USED TO POST TO TWITTER
export const twitterPost = (id, content) => (dispatch) => {
  axiosWithAuth()
    .put(`/posts/${id}/twitter`, content)
    .then((res) => {
      console.log(res);

      dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
      setTimeout(() => {
        dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
      }, timeoutTime);
    })
    .catch((error) => {
      console.log(error.response, 'FAILL');
    });
};

export const twitterPostnow = (id, content) => {
  axiosWithAuth()
    .post(`/posts/${id}/postnow`, content)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error, 'FAIL');
    });
};

export const addCard = (topicId, text, id, cuser) => (dispatch) => {
  postCard(text, id, cuser);

  dispatch({ type: CONSTANTS.ON_ADD_CARD, payload: { topicId, text }, id: id });
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};
export const deleteCard = (cardID) => (dispatch) => {
  deletePostCard(cardID);

  dispatch({ type: CONSTANTS.DELETE_CARD, payload: cardID });
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};
export const editCard = (cardID, content, postInfo) => (dispatch) => {
  editPostCard(cardID, content.post_text);

  dispatch({
    type: CONSTANTS.EDIT_CARD,
    payload: cardID,
    edit: content.post_text,
    date: null,
    screenName: postInfo.screenname,
  });
  console.log(content.post_text, 'POST TEXT');
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};
export const editCardandPost = (cardID, content, postInfo) => (dispatch) => {
  dispatch(twitterPost(cardID, content));

  dispatch({
    type: CONSTANTS.EDIT_CARD,
    payload: cardID,
    edit: content.post_text,
    date: content.date,
    screenName: postInfo.screenname,
  });
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type,
  cb
) => (dispatch) => {
  dispatch({
    type: CONSTANTS.ON_DRAG_END,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  });
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};

//  GET TOPICS
export const fetchTopics = (id) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });
  axiosWithAuth()
    .get(`/topics/${id}/user?sortby=index`)
    // Axios.get(`http://localhost:5000/api/topics/${id}/user`)
    .then((response) => {
      dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS });
      dispatch({ type: CONSTANTS.TOPIC_FETCH_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
};
// ADD TOPIC BACKEND
export const addTopics = (id, topics) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });
  axiosWithAuth()
    .post(`/topics/${id}/user`, topics)
    .then((response) => {
      dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS });
    })
    .catch((error) => {
      console.log(error, 'FAIL');
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
};
// DELETE TOPIC
export const deleteTopics = (id, cuser) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });
  axiosWithAuth()
    .delete(`/topics/${id}`)
    .then((response) => {
      dispatch(fetchTopics(cuser));
    })
    .catch((error) => {
      console.log(error, 'FAIL');
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
};

// EDIT TOPIC
export const editTopic = (topicID, content) => (dispatch) => {
  dispatch({ type: CONSTANTS.EDIT_TOPIC, payload: topicID, edit: content });
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};

export const updateTopics = (cb) => async (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });

  try {
    await cb();
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS });
    // dispatch(fetchTopics(cuser));
  } catch (error) {
    dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error });
  }
};
