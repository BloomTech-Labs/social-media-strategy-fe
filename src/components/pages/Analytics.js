import React, { Fragment } from "react";

import NavMenu from "../nav/NavMenu";

const Analytics = () => {
  return (
    <Fragment>
      <NavMenu />

      <main>
        <h1>Analytics</h1>
      </main>
    </Fragment>
  );
};

export default React.memo(Analytics);
