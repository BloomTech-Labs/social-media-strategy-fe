import React from "react";
// material-ui
import { makeStyles, Typography } from "@material-ui/core";

import Kanban from "../kanban/Kanban";
import CreateTopic from "../kanban2/CreateTopic.js";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.secondary,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - ${theme.navbar.height.small})`,
      maxHeight: `calc(100vh - ${theme.navbar.height.small})`

    },
    [theme.breakpoints.up('xs')]: {
      height: `calc(100vh - ${theme.navbar.height.normal})`,
      maxHeight: `calc(100vh - ${theme.navbar.height.normal})`
    },
    overflow: 'hidden'
  },
  header: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(2)
  }
}));

const MediaManager = ({ user }) => {
  const { root, header } = useStyles();

  return (
    <div className={root}>
      <Typography variant='h4' className={header}>Media Manager</Typography>
      <CreateTopic />
      <Kanban />
    </div>
  );
};

export default MediaManager;
