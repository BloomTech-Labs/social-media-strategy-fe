const topics = {
    // key = topic id
    ['topicId0']: {
        name: 'Drafts',
        items: [
            {
                id: '1',
                content: 'This is the content of a tweet in the Tech topic',
                image_url: null,
            },
            {
                id: '2',
                content: 'This is another example of a tweet in the Tech topic',
                image_url: null
            },
            {
                id: '4',
                content: 'This is once again a tweet in the Tech topic',
                image_url: null
            },
            {
                id: '3',
                content: 'This is the content of a tweet in the business topic',
                image_url: null
            }
        ]
    },
    ['topicId1']: {
        name: 'Business',
        items: []
    },
    ['topicId2']: {
        name: 'Tech',
        items: []
    },
    ['topicId3']: {
        name: 'Motivation',
        items: []
    }   
}

// const initialData = {
//     topics: [
//         {
//             id: 'topic-1',
//             title: 'Business',
//             tweets: [
//                "this is a draft"
//             ],
//         },
//         {
//             id: 'topic-2',
//             title: 'Tech',
//             tweets: [
//                "this is a draft"
//             ],
//         },
//         {
//             id: 'topic-3',
//             title: 'Media',
//             tweets: [
//                "this is a draft"
//             ],
//         },
//         {
//             id: 'topic-4',
//             title: 'Misc',
//             tweets: [
//                "this is a draft"
//             ],
//         }
//     ],
//     topicOrder: ['topic-1', 'topic-2', 'topic-3', 'topic-4']
// }

export default topics;
