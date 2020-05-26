import React from 'react';
import TopicCard2 from './TopicCard2';
import AddTopicButton from './AddTopicButton';

export default function TopicBucket2() {
    return (
        <div>
            <AddTopicButton />
             <div style={{display: 'flex', justifyContent:'center'}}>
                <TopicCard2 /> 
                <TopicCard2 /> 
                <TopicCard2 /> 
                <TopicCard2 /> 
             </div>

        </div>
        
    )
}
