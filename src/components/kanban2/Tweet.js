import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Tweet(props) {
  return (
    <Draggable draggableId={props.tweet.id} index={props.index}>
      {(provided) => <div {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>{props.tweet.tweet}</div>}
    </Draggable>
  );
}
