import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";


const useStyles = makeStyles({
    button2: {
      background: "dodgerblue",
      color: "white",
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

export default function LearnMore() {
const classes = useStyles();
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ padding: "8%" }}>
        <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
          Find out what your followers<br></br> are most interested in
        </h2>
        <p id="simple-modal-description" className={classes.p}>
          SoMe can scan the most recent posts that your followers have engaged
          with and apply a machine learning technique called "topic modeling".
          This attempts to group the posts into five "topics", where certain
          words are used together the most, and then return five lists of words
          that most define those topics. For example, one topic might be defined
          by the words "retweet", "sweepstakes", and "contest". Knowing this
          information might be helpful in increasing your own engagement!
        </p>
        <p id="simple-modal-description" className={classes.p} style={{fontWeight:"bold"}}>
            Long story short: We scan your followers most recent activity to return the 50 words your followers engage with most!
        </p>
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
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
    <div>
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
  );
};
