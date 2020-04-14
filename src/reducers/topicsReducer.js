import CONSTANTS from "../actions/constants";
import { v4 as uuidv4 } from "uuid";

let topicId = 2;
let cardId = 5;

export const initialState = [
  {
    id: `topic-${uuidv4()} topic-0`,
    title: "Drafts",
    user_id: 1,
    cards: [
      {
        id: `card-${0}`,
        content:
          "This is an example of a post that you could draft. Feel free to express yourself!",
      },
    ],
  },
];

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.TOPIC_API_SUCCESS:
      return {
        state: action.payload,
      };

    case CONSTANTS.ON_DRAG_END_SUCCESS:
      return {
        ...state,
        topics: {
          ...state.topics,
          [action.payload.id]: action.payload,
        },
      };
    case CONSTANTS.ON_DRAG_TOPIC_END_SUCCESS:
      return {
        ...state,
        topicOrder: action.payload,
      };
    case CONSTANTS.ON_ADD_TOPIC: // temporary - will need to post to back end and get an ID
      const newTopic = {
        title: action.payload,
        cards: [],
        // id: `topic-${uuidv4()}`,
        id: action.id,
      };

      topicId += 1;

      return [...state, newTopic];
    case CONSTANTS.ON_ADD_CARD: {
      const newCard = {
        content: action.payload.text,
        id: `card-${uuidv4()}`,
      };
      cardId += 1;

      const newState = state.map((topic) => {
        if (topic.id === action.payload.topicId) {
          return {
            ...topic,
            cards: [...topic.cards, newCard],
          };
        } else {
          return topic;
        }
      });
      return newState;
    }
    case CONSTANTS.ON_DRAG_END: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      const newState = [...state];

      // dragging topics
      if (type === "topic") {
        const topic = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...topic);
        return newState;
      }

      // DND in same topic
      if (droppableIdStart === droppableIdEnd) {
        const topic = state.find((topic) => droppableIdStart === topic.id);
        const card = topic.cards.splice(droppableIndexStart, 1);
        topic.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // DND in another topic
      if (droppableIdStart !== droppableIdEnd) {
        // find the topic where drag started
        const topicStart = state.find((topic) => droppableIdStart === topic.id);

        // pull the card from that topic
        const card = topicStart.cards.splice(droppableIndexStart, 1);

        // find the topic where drag ended
        const topicEnd = state.find((topic) => droppableIdEnd === topic.id);

        // put the card into the new list
        topicEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    }
    case CONSTANTS.TOPIC_FETCH_SUCCESS: {
      console.log(action.payload, "NEW STATE");
      return action.payload;
    }
    case CONSTANTS.TOPIC_UPDATE_SUCCESS: {
      console.log(action.payload, "NEW STATE");
      return action.payload;
    }
    case CONSTANTS.DELETE_CARD: {
      let newState = state.map((topics) => {
        return {
          ...topics,
          cards: topics.cards.filter((card) => card.id !== action.payload),
        };
      });
      return newState;
    }

    default:
      return state;
  }
};

export default topicsReducer;
