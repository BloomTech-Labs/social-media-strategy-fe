import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "../sass/topicBuckets.scss";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import { deleteCard } from "../actions";
import Modal from '@material-ui/core/Modal';

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

function editModalLocation(){
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`
  }
}

const modalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#1B262C',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const TopicCard = (props) => {
  const classes = modalStyles();
  const [modalStyle] = useState(editModalLocation);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Schedule Post</h2>
      <p>Here's the input spot</p>
      <button>Schedule</button>
    </div>
  )

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
              <CreateIcon onClick={handleOpen} />
              <MoreVertIcon />
            </Icons>
          </BtnCont>
          <Modal
            open={open}
            onClose={handleClose}
            >
              {modalBody}
          </Modal>
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
