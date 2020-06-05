import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core";

import SideNav from "../nav/SideNav";
import MediaManager from "../dashboard/MediaManager.js";

const useStyles = makeStyles(theme => ({
  pageContainer: {
    width: '100%',
    height: '100vh',
    paddingLeft: theme.navbar.width.close
  }
}));

const Home = () => {
  const { pageContainer } = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={{display: 'flex'}}>
      <SideNav />

      <main className={pageContainer}>
        <MediaManager />
      </main>
    </div>
  );
};

export default React.memo(Home);
