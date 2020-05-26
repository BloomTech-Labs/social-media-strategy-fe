import React from 'react';
import TopicCard2 from './TopicCard2';
import AddTopicButton from './AddTopicButton';


export default function TopicBucket2() {
    return (
        <div style={{height: '100%', overflowY:'scroll', height: 'calc(100vh - 127px)'}}>
            <AddTopicButton />
             <div style={{display: 'flex', justifyContent:'center'}}>
                <TopicCard2 /> 
                <TopicCard2 /> 
                <TopicCard2 /> 
                <TopicCard2 /> 
             </div>
             <br/>
             <br/>
             <br/>
        </div>
        
    )
}
