import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import TextareaAutosize from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';


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

    renderAddButton = () => {

        return (
            <div onClick={this.openForm}>
                <AddBoxIcon />
            </div>
        )
    }

    renderForm = () => {
        const placeholder = 'Enter text for this post';
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
                    variant='contained' 
                    style={{
                    color: 'white',
                    backgroundColor: 'green',
                    borderRadius: 8
                }}>
                    Stuff
                </Button>
                <CloseIcon />
            </div>
        </div>
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default ActionButton;