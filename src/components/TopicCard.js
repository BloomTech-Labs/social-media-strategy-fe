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
import { deleteCard, editCard } from "../actions";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

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

function editModalLocation() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const modalStyles = makeStyles(theme => ({
  paper: {
    fontFamily: "Montserrat, sans-serif",
    position: "absolute",
    width: 400,
    backgroundColor: "#F5F7F8",
    borderRadius: "6px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7)
  },
  mHeader: {
    fontSize: "1.6rem"
  },
  mAccent: {
    lineHeight: ".1rem",
    color: "#e85556",
    fontWeight: 200
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  actionSubmit: {
    color: "#fff",
    backgroundColor: "#E85556",
    borderRadius: "5rem",
    border: "none",
    padding: "1rem",
    margin: ".5rem 1rem",
    width: "40%",
    fontSize: "1.2rem"
  }
}));

const TopicCard = props => {
  const classes = modalStyles();
  const [modalStyle] = useState(editModalLocation);
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState("");
  const [content, setcontent] = useState({ name: "" });
  const [editing, setediting] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = e => {
    e.preventDefault();
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.mHeader}>Edit card</h2>
      <h3 className={classes.mAccent}>Draft, schedule, and post</h3>
      <FormControl className={classes.formControl}>
        <InputLabel id="twitter-handle-select">Social Account</InputLabel>
        <Select
          labelId="twitter-handle-select"
          id="select"
          value={handle}
          onChange={handleChange}
        >
          {/* Replace this with backend Twitter Handle info */}
          <MenuItem value={1}>@lillighanson</MenuItem>
          <MenuItem value={2}>@msdoodler</MenuItem>
          <MenuItem value={3}>@adventureawaits</MenuItem>
        </Select>
      </FormControl>
      <button className={classes.actionSubmit}>Schedule</button>
      <button className={classes.actionSubmit}>Post now</button>
    </div>
  );

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
              {console.log(content.name)}
              <DeleteIcon
                className={`delete`}
                onClick={() => props.deleteCard(props.card.id)}
              />
              <CreateIcon
                className={`${props.card.id}-create`}
                // onClick={() => props.editCard(props.card.id, content)}
                className="edit"
                onClick={() => setediting(!editing)}
              />
              <MoreVertIcon
                className={`${props.card.id}-edit`}
                style={{ padding: "0rem .25rem" }}
                onClick={handleOpen}
              />
            </Icons>
          </BtnCont>
          <Modal open={open} onClose={handleClose}>
            {modalBody}
          </Modal>
          {!editing ? (
            props.card.content
          ) : (
            <>
              <form
                onSubmit={() => props.editCard(props.card.id, content.name)}
              >
                <textarea
                  type="text"
                  name="name"
                  value={content.name}
                  onChange={handleChange}
                />
                &nbsp;{" "}
                <span
                  onClick={() => setediting(!editing)}
                  style={{ color: "red", fontWeight: "bolder", padding: "5px" }}
                >
                  x
                </span>
                <input type="submit" />
              </form>
            </>
          )}
        </Container>
      )}
    </Draggable>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  topics: state.topics
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ deleteCard, editCard }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicCard);
