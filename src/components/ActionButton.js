import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextareaAutosize from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';



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
                <AddCircleIcon style={{"color": "white"}}/>
            </div>
        )
    }

    renderForm = () => {
        const placeholder = 'Enter text for this post';
        return <div style={{"backgroundColor": "white", "padding": "1rem", "borderRadius": ".5rem", "margin": ".5rem 0rem"}}>
            <div style={{"display": "flex", "width":"100%", "justifyContent": "spaceBetween", "alignItems": "center"}}>
            <h2 style={{"color": "black", "lineHeight": ".5rem"}}>Add Card</h2>
            <CloseIcon  style={{"color": "#E85556"}}/>
            </div>
            <p style={{"color": "#E85556"}}> Draft, Schedule, or Post </p>
            <TextField
                id="datetime-local"
                label="Schedule"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className="date"
                InputLabelProps={{
                shrink: true,
                }}
                />
            <Card style={{
                overflow: 'visible',
                minHeight: 80,
                minWidth: 272,
                padding: '6px 8px 2px',
                margin: '.5rem 0rem'
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
            <Box>
                <Button 
                    variant='contained' 
                    style={{
                    color: 'white',
                    backgroundColor: '#E85556',
                    borderRadius: "5rem",
                    margin: "1rem 0rem",
                    width: "100%"
                }}>
                    Schedule
                </Button>
                <Button 
                    variant='contained' 
                    style={{
                    color: '#3282B8',
                    background: "none",
                    borderRadius: "5rem",
                    width: "100%"
                }}>
                    Save to Drafts
                </Button>
            </Box>
        </div>
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default ActionButton;