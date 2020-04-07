import {
  ON_DRAG_END_SUCCESS,
  ON_DRAG_TOPIC_END_SUCCESS,
  ON_ADD_TOPIC,
  ON_ADD_CARD,
  ON_DRAG_END,
} from "../actions/topicsActions";

let topicId = 2;
let cardId = 5;

export const initialState = [
  {
    id: `topic-${0}`,
    title: "Drafts",
    cards: [
      { id: `card-${0}`, content: "This is content from card 1" },
      { id: `card-${1}`, content: "This is content from card 2" },
      { id: `card-${2}`, content: "This is content from card 3" },
      { id: `card-${3}`, content: "This is content from card 4" },
      { id: `card-${4}`, content: "This is content from card 5" },
    ],
  },
  {
    id: `topic-${1}`,
    title: "Women of Lambda",
    cards: [],
  },
];

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_DRAG_END_SUCCESS:
      return {
        ...state,
        topics: {
          ...state.topics,
          [action.payload.id]: action.payload,
        },
      };
    case ON_DRAG_TOPIC_END_SUCCESS:
      return {
        ...state,
        topicOrder: action.payload,
      };
    case ON_ADD_TOPIC: // temporary - will need to post to back end and get an ID
      const newTopic = {
        title: action.payload,
        cards: [],
        id: `topic-${topicId}`,
      };

      topicId += 1;

      return [...state, newTopic];
    case ON_ADD_CARD: {
      const newCard = {
        content: action.payload.text,
        id: `card-${cardId}`,
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
    case ON_DRAG_END:{
      const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, type } = action.payload;
      const newState = [...state];
      
      // dragging topics
      if(type === 'topic') {
        const topic = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...topic);
        return newState;
      }

      // DND in same topic
      if(droppableIdStart === droppableIdEnd) {
        const topic = state.find(topic => droppableIdStart === topic.id);
        const card = topic.cards.splice(droppableIndexStart, 1);
        topic.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // DND in another topic
      if (droppableIdStart !== droppableIdEnd) {
        // find the topic where drag started
        const topicStart = state.find(topic => droppableIdStart === topic.id);

        // pull the card from that topic
        const card = topicStart.cards.splice(droppableIndexStart, 1);

        // find the topic where drag ended
        const topicEnd = state.find(topic => droppableIdEnd === topic.id);

        // put the card into the new list
        topicEnd.cards.splice(droppableIndexEnd, 0, ...card);

      }
      return newState;
    }
    default:
      return state;
  }
};

export default topicsReducer;
