import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, addList } from "../../actions";
// Material-UI
import {
  makeStyles,
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
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles(theme => ({
  content: {
    width: '400px',
    maxWidth: '100%'
  },
  formControl: {
    minWidth: 160
  }
}));

export default function CreatePost({ listId }) {
  const { lists } = useSelector(state => state.kanban);
  const { formControl, content } = useStyles();
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState({
    list_id: "",
    post_text: ""
  });

  useEffect(() => {
    if (lists) {
      const drafts = Object.values(lists).find(list => list.title === 'Drafts');

      if (!drafts) {
        // create Drafts list
        dispatch(addList('Drafts'));
      } else {
        // set Drafts or listId from param as default list
        setPost(prevPost => ({
          ...prevPost,
          list_id: listId ? listId : drafts.id
        }));
      }
    }
  }, [lists, listId]);

  const handleClickOpen = () => {
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

  const handleListChange = e => {
    const target = e.target;

    setPost(prevPost => ({
      ...prevPost,
      list_id: target.value
    }));
  }

  const handleAddButton = e => {
    e.preventDefault();
    dispatch(addPost(post));
    handleClose();
  };

  const handleEnterInput = e => {
    if (post.post_text && e.keyCode === 13) {
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
        <DialogTitle id="form-dialog-title">Add a Post</DialogTitle>
        <DialogContent className={content}>
          {/* Post text */}
          <TextField
            autoFocus
            margin="dense"
            id="post_text"
            label="Post text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange={handleTextInput}
          />

        {/* List Select */}
        <FormControl className={formControl}>
          <InputLabel id="list_label">Category</InputLabel>
          <Select
            labelId="list_label"
            id="list_select"
            value={post.list_id}
            onChange={handleListChange}
          >
            {lists && Object.values(lists).map(list => {
              return (
                <MenuItem key={list.id} value={list.id}>{list.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

          {/* Image upload */}
          {/* <input
            accept="image/*"
            style={{ display: "none" }}
            id="create-tweet"
            multiple
            type="file"
          />
          <label htmlFor="create-tweet">
            <AddAPhotoIcon />
          </label> */}
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
