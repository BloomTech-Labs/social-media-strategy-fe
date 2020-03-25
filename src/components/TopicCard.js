import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import "../sass/topicBuckets.scss";


const TopicCard = (props) => {
    return (
        <Draggable draggableId={String(props.id)} index={props.index}>
            {(provided) => (
                <div className="topic-card" 
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}>
                    <p>{props.text}</p>
                </div>
            )}
        </Draggable>

    )
}

export default TopicCard;