import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { addList } from '../../actions';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    display: 'flex',
    justifyContent:'center'
  }
}));

export default function CreateList() {
  const dispatch = useDispatch();
  const { container } = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddButton = e => {
    e.preventDefault();
    
    dispatch(addList(title));
  }

  const handleTextInput = e => {
    setTitle(e.currentTarget.value);
  }

  return (
    <div class={container}>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Add Topic
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Topic</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Topic Title"
            type="Topic"
            fullWidth
            onChange={handleTextInput}
          />
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent:'space-between'}}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddButton} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}