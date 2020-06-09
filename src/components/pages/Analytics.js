import React, { useState, Fragment } from "react";

import Nav from "../nav/Nav";
import DrawerMenu from "../nav/DrawerMenu";

const Analytics = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Fragment>
      <Nav toggleMenu={toggleMenu} />
      <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />

      <main>
        <h1>Analytics</h1>
      </main>
    </Fragment>
  );
};

export default React.memo(Analytics);
