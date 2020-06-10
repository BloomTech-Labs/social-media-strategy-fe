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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

export default function CreatePost({ closeDrawer }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState({
    list_id: "",
    post_text: ""
  });

  const handleClickOpen = () => {
    closeDrawer();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTextInput = e => {
    const target = e.currentTarget;
    setPost(prevPost => ({
      ...prevPost,
      [target.id]: target.value
    }));
  };

  const handleAddButton = e => {
    e.preventDefault();
    dispatch(addPost(post));
    handleClose();
  };

  const handleEnterInput = e => {
    if (e.keyCode === 13) {
      dispatch(addPost(post));
      handleClose();
    }
  };

  return (
    <>
      <List>
        <ListItem button onClick={handleClickOpen}>
            <ListItemIcon>
                <AddCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add post" />
        </ListItem>
      </List>
      <Dialog
        open={isOpen}
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
            multiline
            rows={4}
            variant="outlined"
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
    </>
  );
}
