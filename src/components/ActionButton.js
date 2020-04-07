import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import TextareaAutosize from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { addTopic, addCard } from '../actions';

class ActionButton extends React.Component {

    state = {
        formOpen: false
    }

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };

    closeForm = (e) => {
        this.setState({
            formOpen: false,
            text: ''
        })
    }

    handleChanges = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddTopic = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            dispatch(addTopic(text));
        }

        return;
    }

    handleAddCard = () => {
        const { dispatch, topicId } = this.props;
        const { text } = this.state;

        if(text) {
            dispatch(addCard(topicId, text));
        }
    }

    renderAddButton = () => {
        const buttonText = this.props.topic ? 'Add another topic' : 'Add another card'

        return (
            <div onClick={this.openForm}>
                <p><AddBoxIcon />{buttonText}</p>
            </div>
        )
    }

    renderForm = () => {
        const placeholder = this.props.topic ? 'Enter title for this topic' : 'Enter text for this post';

        const buttonTitle = this.props.topic ? 'Add Topic' : 'Add Card';

        return <div>
            <Card style={{
                overflow: 'visible',
                minHeight: 80,
                minWidth: 272,
                padding: '6px 8px 2px'
            }}>
            <TextareaAutosize 
                placeholder={placeholder} 
                autoFocus 
                onBlur={this.closeForm}
                value={this.state.text}
                onChange={this.handleChanges}
                style={{
                    resize: 'none',
                    width: '100%',
                    outline: 'none',
                    border: 'none',
                    overflow: 'hidden'
                }}
            />
            </Card>
            <div>
                <Button 
                    onMouseDown={this.props.topic ? this.handleAddTopic : this.handleAddCard}
                    variant='contained' 
                    style={{
                    color: 'white',
                    backgroundColor: 'green',
                    borderRadius: 8
                }}>
                    {buttonTitle}
                </Button>
                <CloseIcon />
            </div>
        </div>
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default connect()(ActionButton);