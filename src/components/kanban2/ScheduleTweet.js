import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function ScheduleTweet() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button color="primary" onClick={handleClickOpen}>Schedule</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Recommended Times</DialogTitle>
        <DialogContent style={{display: 'flex', justifyContent:'space-around'}}>
            <Button variant="contained" size="small" style={{margin: 3}}>9:05am</Button>
            <Button variant="contained" size="small" style={{margin: 3}}>10:22am</Button>
            <Button variant="contained" size="small" style={{margin: 3}}>3:58pm</Button>
            <Button variant="contained" size="small" style={{margin: 3}}>6:22pm</Button>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
