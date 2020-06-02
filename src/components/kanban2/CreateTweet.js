import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Recommendations from "./Recommendations";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

export default function CreateTopic() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AddCircleIcon color="secondary" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a Tweet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tweet"
            type="Topic"
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="create-tweet"
            multiple
            type="file"
          />
          <label htmlFor="create-tweet">
            <AddAPhotoIcon />
          </label>
        </DialogContent>

        <DialogContent>
          <Recommendations />
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add To List
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
