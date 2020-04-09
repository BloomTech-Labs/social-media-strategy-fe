import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextareaAutosize from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { addTopic, addCard } from "../actions";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class ActionButton extends React.Component {
  state = {
    formOpen: false
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
    console.log("opened");
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

        const buttonText = this.props.topic ? 'Add Topic' : 'Add Card'

        return(
            <div onClick={this.openForm}>
                <p style={{"color": this.props.buttonColor}}><AddCircleIcon style={{"color": this.props.buttonColor}} />{buttonText}</p>
            </div>
        )
        
    }

    renderForm = () => {
        const placeholder = this.props.topic ? 'Enter title for this topic' : 'Enter text for this post';
        const buttonTitle = this.props.topic ? 'Add Topic' : 'Add Card';
        return
            <>
            <div style={{"backgroundColor": "white", "padding": ".5rem"}}>
            <div style={{"display": "flex", "width":"100%", "justifyContent": "spaceBetween", "alignItems": "center"}}>
            <h2 style={{"color": "black", "lineHeight": ".5rem"}}>Add</h2>
            <CloseIcon  style={{"color": "#E85556"}}/>
            </div>

            {/* ==Schedule option for RC2==
                <TextField
                    position="absolute"
                    id="datetime-local"
                    label="Schedule"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className="date"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    />
            ========================== */}

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
                    onMouseDown={this.props.topic ? this.handleAddTopic : this.handleAddCard}
                    variant='contained' 
                    style={{
                    color: 'white',
                    backgroundColor: '#E85556',
                    borderRadius: "5rem",
                    margin: "1rem 0rem",
                    width: "100%"
                }}>
                    {buttonTitle}
                </Button>
            </Box>

        </div>
        <p style={{ color: "#E85556" }}> Draft, Schedule, or Post </p>
        <TextField
            id="datetime-local"
            label="Schedule"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className="date"
            InputLabelProps={{
            shrink: true
        }}
        />

        <Card
            style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
            margin: ".5rem 0rem"
        }}
        >
        <TextareaAutosize
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleChanges}
            style={{
                resize: "none",
                width: "100%",
                outline: "none",
                border: "none",
                overflow: "hidden"
            }}
        />
        </Card>
        <Box>
        <Button
            className="actionSubmit"
            onMouseDown={
                this.props.topic ? this.handleAddTopic : this.handleAddCard
            }
            variant="contained"
            style={{
                color: "white",
                backgroundColor: "#E85556",
                borderRadius: "5rem",
                margin: "1rem 0rem",
                width: "100%"
            }}
        >
            {buttonTitle}
        </Button>
        <Button
            variant="contained"
            style={{
                color: "#3282B8",
                background: "none",
                borderRadius: "5rem",
                width: "100%"
            }}
        >
            Save to Drafts
            </Button>
        </Box>
        
        </>
    
};

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default connect()(ActionButton);
