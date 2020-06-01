import React from "react";
// material-ui
import { makeStyles, Typography } from "@material-ui/core";

import Kanban from "../kanban/Kanban";
import CreateList from "../kanban/CreateList.js";
import Scrollbars from "react-custom-scrollbars";

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
  topContainer: {
    height: theme.kanban.topContainer.height,
    display: 'flex',

  },
  header: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
    width: '100%',
    textAlign: 'center'
  },
  scrollbar: {
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - ${theme.navbar.height.small} - ${theme.kanban.topContainer.height}) !important`
    },
    [theme.breakpoints.up('xs')]: {
      height: `calc(100vh - ${theme.navbar.height.normal} - ${theme.kanban.topContainer.height}) !important`
    },
    
  }
}));

const MediaManager = () => {
  const { root, header, scrollbar, topContainer } = useStyles();

  return (
    <div className={root}>
      <div className={topContainer}>
        <Typography variant='h4' className={header}>Media Manager</Typography>
        <CreateList />
      </div>
      <Scrollbars className={scrollbar}>
        <Kanban />
      </Scrollbars>
    </div>
  );
};

export default MediaManager;
