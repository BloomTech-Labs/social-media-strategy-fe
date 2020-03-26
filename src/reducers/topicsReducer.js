import { ON_DRAG_END_SUCCESS, ON_DRAG_TOPIC_END_SUCCESS } from "../actions/topicAction";

export const initialState = {
  cards: {
    "card-1": { id: "card-1", content: "This is content from card 1" },
    "card-2": { id: "card-2", content: "This is content from card 2" },
    "card-3": { id: "card-3", content: "This is content from card 3" },
    "card-4": { id: "card-4", content: "This is content from card 4" },
    "card-5": { id: "card-5", content: "This is content from card 5" }
  },
  topics: {
    "topic-1": {
      id: "topic-1",
      title: "Drafts",
      cardsIds: ["card-1", "card-2", "card-3", "card-4", "card-5"]
    },
    "topic-2": {
        id: "topic-2",
        title: "Women of Lambda",
        cardsIds: []
      },
      
  },
  topicOrder: ["topic-1", 'topic-2']
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_DRAG_END_SUCCESS:
      return {
        ...state,
        topics: {
          ...state.topics,
          [action.payload.id]: action.payload
        }
      };
    case ON_DRAG_TOPIC_END_SUCCESS:
        return {
            ...state,
            topicOrder: action.payload
        }
    default:
      return state;
  }
};

export default topicsReducer;
