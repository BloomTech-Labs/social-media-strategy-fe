import React, { Fragment } from "react";
import NavMenu from "../nav/NavMenu";
import Stats from "../analytics/Stats";

const Analytics = () => {
  return (
    <Fragment>
      <NavMenu />

      <main>
        
        <Stats/>
      </main>
    </Fragment>
  );
};

export default React.memo(Analytics);
