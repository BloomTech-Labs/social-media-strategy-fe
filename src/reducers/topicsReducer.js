import { DRAG_HAPPENED } from "../actions";

export const initialState = {
    cards: {
        'card-1': { id: 'card-1', content: 'This is content from card 1'},
        'card-2': { id: 'card-2', content: 'This is content from card 2'},
        'card-3': { id: 'card-3', content: 'This is content from card 3'},
        'card-4': { id: 'card-4', content: 'This is content from card 4'},
        'card-5': { id: 'card-5', content: 'This is content from card 5'}
    },
    topics: {
        'topic-1': {
            id: 'topic-1',
            title: 'Drafts',
            cardsIds: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5']

        }
    },
    topicOrder: ['topic-1']
};
    

const topicsReducer = (state = initialState, action) => {
    switch(action.type) {
        case DRAG_HAPPENED: 
            const { 
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId} = action.payload;
            const newState = [...state];
            // moves in same topic
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            return newState;
        default:
            return state;
    }
}

export default topicsReducer;