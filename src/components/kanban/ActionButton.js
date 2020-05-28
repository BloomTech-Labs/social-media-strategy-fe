// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { v4 as uuidv4 } from 'uuid';

// FILES
import { addTopic, addCard } from '../../actions';

// STYLING
import '../../sass/actionButton.scss';

class ActionButton extends React.Component {
  state = {
    formOpen: false,
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
      text: '',
    });
  };

  handleChanges = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddTopic = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    const id = `topic-${uuidv4()}`;
    const cuser = this.props.user.currentUser.subject;
    if (text) {
      dispatch(addTopic(text, id, cuser));
    }
    return;
  };
  handleAddCard = () => {
    const { dispatch, topicId } = this.props;
    const { text } = this.state;
    const cuser = this.props.user;
    console.log(this.props.user.accounts[0].screen_name, 'PROPS');

    const id = `card-${uuidv4()}`;
    if (text) {
      dispatch(addCard(topicId, text, id, cuser));
    }
  };

  renderAddButton = () => {
    const buttonText = this.props.topic ? 'Add Topic' : '';
    return (
      <div className='actionOpener' onClick={this.openForm}>
        <p
          className='closed-btn'
          style={{
            color: this.props.buttonColor,
          }}
        >
          <AddCircleIcon style={{ color: '#E10050' }} />
          {buttonText}
        </p>
      </div>
    );
  };

  renderForm = () => {
    const placeholder = this.props.topic
      ? 'Enter title for this topic'
      : 'What would you like to share?';

    const buttonTitle = this.props.topic ? 'Add Topic' : 'Add Post';
    return (
      <div
        className='action-btn-cont'
        id={this.props.topic ? 'addTopicButton' : null}
      >
        <h2 className='add-h2'>Add Tweet</h2>
        {/* <div style={{ color: "#E85556" }} />
        {<p style={{ color: "#E85556" }}> Draft, Schedule, or Post </p>} */}
        <Card className='add-card'>
          <TextareaAutosize
            placeholder={placeholder}
            autoFocus
            maxLength='280'
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleChanges}
            className='add-card-txt-area'
          />
        </Card>
        <Button
          className='actionSubmit'
          style={{
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: '#E10050',
            borderRadius: '4px',
            margin: '1rem 0rem',
            width: 'auto',
            font: 'Roboto'
          }}
          onMouseDown={
            this.props.topic ? this.handleAddTopic : this.handleAddCard
          }
          variant='contained'
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

const mapStateToProps = (state) => ({
  user: state.user,
  topics: state.topics,
});
export default connect(mapStateToProps)(ActionButton);
