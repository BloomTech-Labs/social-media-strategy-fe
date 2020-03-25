import { DRAG_HAPPENED } from "../actions";

const initialState =[
    {
        id: `list-${0}`,
        title: 'Drafts',
        cards: [
            {
                id: `card=${2}`,
                text: 'This is a test card from the reducer initial state'
            },
            {
                id: `card=${3}`,
                text: 'This is also a test card from the reducer initial state'
            }
        ]
    },
    {
        id: `list-${1}`,
        title: 'User Created Title',
        cards: [
            {
                id: `card=${4}`,
                text: 'Card number 1 for fun'
            },
            {
                id: `card=${5}`,
                text: 'again'
            },
            {
                id: `card=${6}`,
                text: 'and again'
            }
        ]
    }
]

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