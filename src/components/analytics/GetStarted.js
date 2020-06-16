import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {SEARCH_REQUEST} from "../../actions/popwordsActions";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: "1%",
    marginTop: "0!important",
    padding: "2.5% 5.5%",
  },
  title: {
    fontSize: 40,
    fontFamily: "Roboto Condensed",
    fontWeight: "Bold",
    lineHeight: "100%",
  },
  button1: {
    background: "#6A4DE0",
    color: "white",
  },
  button2: {
    background: "white",
    color: "#6A4DE0",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
  },
  p: {
    textAlign: "justify",
    letterSpacing: "1px",
    textIndent: "20px",
    fontWeight: "normal",
  },
});


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const GetStarted = props => {
  const classes = useStyles();
  const popWords = useSelector(state => state.popWords);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ padding: "4%" }}>
        <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
          Want to know what your followers are most interested in?
        </h2>
        <p id="simple-modal-description" className={classes.p}>
          SoMe can scan the most recent posts that your followers have engaged
          with and apply a machine learning technique called "topic modeling".
          This attempts to group up the posts into five "topics", where certain
          words are used together the most, and then return five lists of words
          that most define those topics. For example, one topic might be defined
          by the words "retweet", "sweepstakes", and "contest". Knowing this
          information might be helpful in increasing your own engagement!
        </p>
        <p id="simple-modal-description" className={classes.p}>
          Please keep in mind that the process of scanning your twitter
          followers can take some time. How long depends on how many followers
          you have, how many of them we're scanning, as well as how many other
          users are currently queued up.
        </p>
        <span style={{display:'flex', justifyContent: 'flex-end'}}>
        <Button
          className={classes.button2}
          variant="contained"
          onClick={handleClose}
        >
          Close
        </Button>
        </span>

      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} style={{ color: "#4E4E4E" }}>
            Need
          </Typography>
          <Typography className={classes.title} style={{ color: "#6A4DE0" }}>
            Inspiration?
          </Typography>
          <br />
          <Typography>
            Gain insights into the words your followers engage with most
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5%",
            }}
          >
            <Button 
              className={classes.button1} 
              variant="contained"
              onClick={(() => dispatch({type: SEARCH_REQUEST}))}>
              Start Analysis
            </Button>
            <Button
              className={classes.button2}
              variant="contained"
              onClick={handleOpen}
            >
              Learn More
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetStarted;

