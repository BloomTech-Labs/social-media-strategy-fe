import React, { Fragment } from "react";
import NavMenu from "../nav/NavMenu";
import Stats from "../analytics/Stats";

const Analytics = () => {
  return (
    <Fragment>
      <NavMenu />

      <main>
        <h1 style={{fontFamily:"Roboto Condensed", color: "#4E4E4E", marginLeft:"10%", fontSize:"25pt"}}>Analytics</h1>
        <Stats/>
      </main>
    </Fragment>
  );
};

export default React.memo(Analytics);
