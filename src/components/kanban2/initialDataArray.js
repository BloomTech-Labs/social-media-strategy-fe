const uuid = require('uuid').v4;

export const dummyTopics = [
    {
        id: '1',
        name: 'Business'
    },
    {
        id: '2',
        name: 'Tech'
    },
    {
        id: '3',
        name: 'Motivation',
    }
];

export const dummyPosts = [
    {
        id: '1',
        index: 1,
        topicId: '2',
        content: 'This is a tweet'
    },
    {
        id: '2',
        index: 0,
        topicId: '2',
        content: 'New tweet'
    },
    {
        id: '3',
        index: 0,
        topicId: '3',
        content: 'I think I will post this'
    }
]

export const initialData = {
    posts: {
        '1': {
            id: '1',
            index: 1,
            topicId: '2',
            content: 'This is a tweet',
        },
        '2': {
            id: '2',
            index: 0,
            topicId: '2',
            content: 'New tweet',
        },
        '3': {
            id: '3',
            index: 0,
            topicId: '3',
            content: 'I think I will post this'
        }
    }
}

// export default topics;
