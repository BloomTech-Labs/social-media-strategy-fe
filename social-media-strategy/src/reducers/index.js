export const initialState = {
    user: {
        firstName: 'Asami',
        lastName: 'Arata',
        twitterHandle: '@AsamiArata',
        location: 'San Francisco Bay Area',
        posts: 451,
        following: 250,
        followers: 2.6
    },
    topics: ['Tech Around the Block', 'Cute Images', 'Tools for Devs', 'Backlog', 'Default'],
    drafts: [
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Tech Around the Block'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Tech Around the Block'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Tech Around the Block'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Tech Around the Block'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Tech Around the Block'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Tech Around the Block'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Tech Around the Block'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Cute Images'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Cute Images'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Cute Images'},
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Cute Images'}
    ],
    queue: [
        {text: 'Here is some text that is a placeholder. I thought that you would like some placeholders.', topic: 'Cute Images'},
    ]
}