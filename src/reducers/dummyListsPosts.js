const lists = {
    // key = list id
    ['listId0']: {
        id: 'listId0',
        name: 'Drafts',
        index: 0,
        posts: [
            {
                id: '1',
                listId: 'listId0',
                content: 'This is the content of a tweet in the Tech list',
                index: 0,
                imageUrl: null,
            },
            {
                id: '2',
                listId: 'listId0',
                content: 'This is another example of a tweet in the Tech list',
                index: 1,
                imageUrl: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '3',
                listId: 'listId0',
                content: 'This is once again a tweet in the Tech list',
                index: 2,
                imageUrl: null
            },
            {
                id: '4',
                listId: 'listId0',
                content: 'This is the content of a tweet in the business list',
                index: 3,
                imageUrl: 'https://images.unsplash.com/photo-1590796992955-b0124a34ab04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '5',
                listId: 'listId0',
                content: 'This is the content of a tweet in the Tech list',
                index: 4,
                imageUrl: null,
            }
        ]
    },
    ['listId1']: {
        id: 'listId1',
        name: 'Business',
        index: 1,
        posts: []
    },
    ['listId2']: {
        id: 'listId2',
        name: 'Tech',
        index: 2,
        posts: []
    },
    ['listId3']: {
        id: 'listId3',
        name: 'Motivation',
        index: 3,
        posts: []
    },
    ['listId4']: {
        id: 'listId4',
        name: 'Work',
        index: 4,
        posts: []
    }
}
export default lists;