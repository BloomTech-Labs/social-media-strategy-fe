import React, { useState, Fragment } from "react";

import Nav from "../nav/Nav";
import DrawerMenu from "../nav/DrawerMenu";

import MediaManager from "../dashboard/MediaManager.js";

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
