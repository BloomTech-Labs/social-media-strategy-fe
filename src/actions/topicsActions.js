export const ON_DRAG_END_SUCCESS = "ON_DRAG_END_SUCCESS ";
export const ON_DRAG_TOPIC_END_SUCCESS = "ON_DRAG_TOPIC_END_SUCCESS";
export const ON_ADD_TOPIC = "ON_ADD_TOPIC";
export const ON_ADD_CARD = "ON_ADD_CARD";
export const ON_DRAG_END = "ON_DRAG_END;";
export const TOPIC_API_START = "TOPIC_API_START";
export const TOPIC_API_SUCCESS = "TOPIC_API_SUCCESS";
export const TOPIC_API_FAILURE = "TOPIC_API_FAILURE";

export const onDragEndSingle = (newTopic) => (dispatch) => {
  dispatch({ type: ON_DRAG_END_SUCCESS, payload: newTopic });
  // post changes to the back end
};

export const onDragEndDouble = (newStart, newFinish) => (dispatch) => {
  dispatch({ type: ON_DRAG_END_SUCCESS, payload: newStart });
  dispatch({ type: ON_DRAG_END_SUCCESS, payload: newFinish });
  // post changes to the back end
};

export const onDragEndTopic = (newTopicOrder) => (dispatch) => {
  dispatch({ type: ON_DRAG_TOPIC_END_SUCCESS, payload: newTopicOrder });
};

export const addTopic = (text) => (dispatch) => {
  dispatch({ type: ON_ADD_TOPIC, payload: text });
};

export const addCard = (topicId, text) => (dispatch) => {
  dispatch({ type: ON_ADD_CARD, payload: { topicId, text } });
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
    type: ON_DRAG_END,
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
