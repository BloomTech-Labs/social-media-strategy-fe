import React, { useState } from "react";
import CreatePostModal from "../kanban/CreatePostModal";
// Material-UI
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const CreatePost = () => {  
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <List>
        <ListItem button onClick={handleOpen}>
            <ListItemIcon>
                <AddCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add post" />
        </ListItem>
      </List>

      <CreatePostModal open={isOpen} handleClose={handleClose} />
    </>
  );
}

export default CreatePost;
