import React, { useState } from "react";

import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

import MediaManager from "./dashboard/MediaManager.js";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Nav toggleMenu={toggleMenu} />
      <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />

      <main>
        {/* <Route exact path={["/home", "/home/media-manager"]}>
          <MediaManager />
        </Route> */}
      </main>
    </>
  );
};

export default React.memo(Home);
