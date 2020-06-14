import React, { Fragment } from "react";
import Stats from "../analytics/Stats";
import PopularWords from "../analytics/PopularWords";



const Analytics = () => {
  return (
    <Fragment>
      <h1
        style={{
          fontFamily: "Roboto Condensed",
          color: "#4E4E4E",
          marginLeft: "15%",
          fontSize: "30pt",
        }}
      >
        Analytics
      </h1>
      <Stats />
      <PopularWords/>
    </Fragment>
  );
};

export default React.memo(Analytics);
