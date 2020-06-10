import React, { useState } from "react";
// Material-UI
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from "@material-ui/core";
// Material-UI icons
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/listsActions";

const PostMenu = ({ post }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleAnchorEl = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleEdit = async () => {
  //   console.log("edit");
  // };

  const handleDelete = async () => {
    dispatch(deletePost(post));
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleAnchorEl}
        color="inherit"
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isOpen}
        onClose={handleClose}
      >
        {/* { !post.posted && 
                    <MenuItem onClick={handleEdit}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Edit" />
                    </MenuItem> 
                } */}
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostMenu;
