import { axiosWithAuth } from "../utils/axiosWithAuth";

export const ON_DRAG_END_SUCCESS = "ON_DRAG_END_SUCCESS ";

export const onDragEndSingle = newTopic => dispatch => {
    dispatch({ type: ON_DRAG_END_SUCCESS, payload: newTopic})
    // post changes to the back end
}

export const onDragEndDouble = (newStart, newFinish) => dispatch => {
    dispatch({ type: ON_DRAG_END_SUCCESS, payload: newStart})
    dispatch({ type: ON_DRAG_END_SUCCESS, payload: newFinish})
    // post changes to the back end
}
  