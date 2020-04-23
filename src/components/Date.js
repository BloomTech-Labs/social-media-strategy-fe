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
        <span className="organizeDate">
          <h4 id="day" className="highlight">
            {Moment().format("dddd")}
          </h4>{" "}
          <h4 className="date">{getDate()}</h4>
          <span className="time">{getTime()}</span>
        </span>
      </div>
    </>
  );
};

export default Date;
