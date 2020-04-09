import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "../sass/topicBuckets.scss";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Container = styled.div`
  background-color: white;
  width: 95%;
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  margin: 0.75rem;
  text-align: center;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const TopicCard = props => {
  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {provided => (
        <Container
          className={`${props.className}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <BtnCont>
            <Icons>
              <CreateIcon />
              <MoreVertIcon />
            </Icons>
          </BtnCont>
          {props.card.content}
        </Container>
      )}
    </Draggable>
  );
};

export default TopicCard;
