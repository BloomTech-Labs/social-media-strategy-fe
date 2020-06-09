import React, { useState, Fragment } from "react";

import Nav from "../nav/Nav";
import DrawerMenu from "../nav/DrawerMenu";
import Stats from "../analytics/Stats";

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
        <h1 style={{fontFamily:"Roboto-Condensed", color: "#4E4E4E", marginLeft:"7%"}}>Analytics</h1>
        <Stats/>
      </main>
    </Fragment>
  );
};

export default React.memo(Analytics);
