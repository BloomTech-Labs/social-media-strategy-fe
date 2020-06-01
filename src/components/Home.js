import React, { useState, Fragment } from "react";

import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

import MediaManager from "./dashboard/MediaManager.js";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Fragment>
      <Nav toggleMenu={toggleMenu} />
      <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />

      <main>
        <MediaManager />
      </main>
    </Fragment>
  );
};

export default React.memo(Home);
