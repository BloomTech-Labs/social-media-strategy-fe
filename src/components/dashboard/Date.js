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
          <h4 data-cy="day" id="day" className="highlight">
            {Moment().format("dddd")}
          </h4>{" "}
          <h4 data-cy="today" className="date">
            {getDate()}
          </h4>
          <span data-cy="time" className="time">
            {getTime()}
          </span>
        </span>
      </div>
    </>
  );
};

export default Date;
