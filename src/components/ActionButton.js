// LIBRARIES
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@material-ui/core";


// FILES
import { addTopic, addCard } from "../actions";

// STYLING
import '../sass/actionButton.scss';


class ActionButton extends React.Component {
  state = {
    formOpen: false
  };
  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false,
      text: ""
    });
  };

  handleChanges = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleAddTopic = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addTopic(text));
    }
    return;
  };
  handleAddCard = () => {
    const { dispatch, topicId } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addCard(topicId, text));
    }
  };

  renderAddButton = () => {
    const buttonText = this.props.topic ? "Add Topic" : "Add Card";
    return (
      <div className="actionOpener" onClick={this.openForm}>
        <p
          className="closed-btn"
          style={{
            color: this.props.buttonColor
          }}
        >
          <AddCircleIcon style={{ color: this.props.buttonColor }} />
          {buttonText}
        </p>
      </div>
    );
  };

  renderForm = () => {

    const placeholder = this.props.topic
      ? "Enter title for this topic"
      : "Enter text for this post";
    const buttonTitle = this.props.topic ? "Add Topic" : "Add Card";
    return (
      <div className="action-btn-cont">
          <h2 className="add-h2">Add</h2>
          {/* <CloseIcon style={{ color: "#E85556" }} /> */}
        {/* {<p style={{ color: "#E85556" }}> Draft, Schedule, or Post </p>} */}
        <Card
          className="add-card"
        >
          <TextareaAutosize
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleChanges}
            className="add-card-txt-area"
          />
        </Card>
          <Button
            className="actionSubmit"
            style={{
              color: 'white',
              backgroundColor: '#E85556',
              borderRadius: '5rem',
              margin: '1rem 0rem',
              width: '100%'
            }}
            onMouseDown={
              this.props.topic ? this.handleAddTopic : this.handleAddCard
            }
            variant="contained"
          >
            {buttonTitle}
          </Button>
      </div>
    );
  };
  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}
export default connect()(ActionButton);
