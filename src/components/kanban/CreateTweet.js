import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions";

// Material-UI
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

export default function CreatePost({ listId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({
    list_id: listId,
    post_text: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextInput = (e) => {
    const target = e.currentTarget;
    setPost((prevPost) => ({
      ...prevPost,
      [target.id]: target.value,
    }));
  };

  const handleAddButton = (e) => {
    e.preventDefault();
    dispatch(addPost(post));
    handleClose();
  };

  const handleEnterInput = (e) => {
    if (e.keyCode === 13) {
      dispatch(addPost(post));
      handleClose();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AddCircleIcon
        style={{ cursor: "pointer" }}
        color="secondary"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onKeyUp={handleEnterInput}
      >
        <DialogTitle id="form-dialog-title">Add a Tweet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="post_text"
            label="Tweet"
            fullWidth
            onChange={handleTextInput}
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

        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddButton} color="primary">
            Add to List
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
