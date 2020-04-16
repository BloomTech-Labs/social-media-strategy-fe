import CONSTANTS from "./constants";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Axios from "axios";

//Current user
const setid = localStorage.getItem("CUSER");
const cuser = JSON.parse(setid);
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

export const addTopic = (text, id) => (dispatch) => {
  dispatch({
    type: CONSTANTS.ON_ADD_TOPIC,
    payload: text,
    id: id,
  });
  dispatch(
    addTopics(cuser, { user_id: cuser, title: text, id: id, cards: [] })
  );
};

export const addCard = (topicId, text) => (dispatch) => {
  dispatch({ type: CONSTANTS.ON_ADD_CARD, payload: { topicId, text } });
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};
export const deleteCard = (cardID) => (dispatch) => {
  dispatch({ type: CONSTANTS.DELETE_CARD, payload: cardID });
  dispatch({ type: CONSTANTS.USER_APICALL_START, didUpdate: true });
  setTimeout(() => {
    dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS, didUpdate: false });
  }, timeoutTime);
};
export const editCard = (cardID, content) => (dispatch) => {
  dispatch({ type: CONSTANTS.EDIT_CARD, payload: cardID, edit: content });
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
// ADD TOPIC
export const addTopics = (id, topics) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });
  axiosWithAuth()
    .post(`/topics/${id}/user`, topics)
    .then((response) => {
      dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS });

      // dispatch({
      //   type: CONSTANTS.TOPIC_UPDATE_SUCCESS,
      //   payload: response.data,
      // });
    })
    .catch((error) => {
      console.log(error, "FAIL");
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
};
// DELETE TOPIC
export const deleteTopics = (id) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });
  axiosWithAuth()
    .delete(`/topics/${id}`)
    .then((response) => {
      dispatch(fetchTopics(cuser));

      // dispatch({
      //   type: CONSTANTS.TOPIC_UPDATE_SUCCESS,
      //   payload: response.data,
      // });
    })
    .catch((error) => {
      console.log(error, "FAIL");
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
};

// EDIT TOPIC
export const editTopicTitle = (id, title) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });
  axiosWithAuth()
    .put(`/topics/${id}`, { title: title })
    .then((response) => {
      dispatch(fetchTopics(cuser));

      // dispatch({
      //   type: CONSTANTS.TOPIC_UPDATE_SUCCESS,
      //   payload: response.data,
      // });
    })
    .catch((error) => {
      console.log(error, "FAIL");
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
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
