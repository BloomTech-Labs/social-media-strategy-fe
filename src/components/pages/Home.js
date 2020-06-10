import React from "react";
import { makeStyles } from "@material-ui/core";

import NavMenu from "../nav/NavMenu";
import MediaManager from "./MediaManager.js";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
    },
  },
  content: {
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      paddingLeft: theme.navbar.width.close,
      height: "100vh",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0",
      height: `calc(100vh - ${theme.navbar.height})`,
    },
  },
}));

const Home = () => {
  const { pageContainer, content } = useStyles();

  return (
    <div className={pageContainer}>
      <NavMenu />

      <main className={content}>
        <MediaManager />
      </main>
    </div>
  );
};

export default React.memo(Home);
