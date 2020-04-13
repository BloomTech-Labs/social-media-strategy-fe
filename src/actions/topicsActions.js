import CONSTANTS from "./constants";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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

export const addTopic = (text) => (dispatch) => {
  dispatch({ type: CONSTANTS.ON_ADD_TOPIC, payload: text });
};

export const addCard = (topicId, text) => (dispatch) => {
  dispatch({ type: CONSTANTS.ON_ADD_CARD, payload: { topicId, text } });
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
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
};

export const fetchTopics = (id) => (dispatch) => {
  dispatch({ type: CONSTANTS.TOPIC_FETCH_START });
  axiosWithAuth()
    .get(`/topics/${id}/user`)
    .then((response) => {
      console.log(response.data, "FETCH RES");
      dispatch({ type: CONSTANTS.TOPIC_FETCH_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: CONSTANTS.TOPIC_FETCH_FAILURE });
    });
};

export const updateTopics = (id, topics) => (dispatch) => {
  dispatch({ type: CONSTANTS.TOPIC_UPDATE_START });
  axiosWithAuth()
    .put(`/topics/${id}`, topics)
    .then((response) => {
      console.log(response.data, "SUCCESS");
      dispatch({
        type: CONSTANTS.TOPIC_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error, "FAIL");
      dispatch({ type: CONSTANTS.TOPIC_UPDATE_FAILURE, payload: error.data });
    });
};
