import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "../sass/topicBuckets.scss";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteCard } from "../actions";

const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  margin: 0.5rem;
  width: 80%;
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

const TopicCard = (props) => {
  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => (
        <Container
          className={`${props.className}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <BtnCont>
            <Icons>
              <DeleteIcon onClick={() => props.deleteCard(props.card.id)} />
              <CreateIcon />
              <MoreVertIcon />
            </Icons>
          </BtnCont>
          {console.log(props.card.id, "CARD ID")}
          {props.card.content}
        </Container>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  topics: state.topics,
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ deleteCard }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicCard);
