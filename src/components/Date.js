import React from "react";
import Moment from "moment";
const Date = () => {
  function getDate() {
    const todaysDate = Moment().format("MMM DD, YYYY");
    return todaysDate;
  }

  function getTime() {
    const currentTime = Moment().format("LT");
    return currentTime;
  }
  return (
    <>
      <div className="dash-title">
        <h4 className="highlight">{Moment().format("dddd")}</h4>{" "}
        <h4 className="highlight"> • </h4>
        <h4 className="date">{getDate()}</h4>
      </div>
      <div className="time">{getTime()}</div>
    </>
  );
};

export default Date;
