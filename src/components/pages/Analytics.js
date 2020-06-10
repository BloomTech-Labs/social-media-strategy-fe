import React, { Fragment } from "react";
import Stats from "../analytics/Stats";

const Analytics = () => {
  return (
    <Fragment>
      <h1
        style={{
          fontFamily: "Roboto Condensed",
          color: "#4E4E4E",
          marginLeft: "6%",
          fontSize: "30pt",
        }}
      >
        Analytics
      </h1>
      <Stats />
    </Fragment>
  );
};

export default React.memo(Analytics);
