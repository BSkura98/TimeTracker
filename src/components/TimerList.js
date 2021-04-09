import React from "react";

import Timer from "./Timer";

const TimerList = () => {
  return (
    <div className="timer-container">
      <ul className="timer-list">
        <Timer />
        <Timer />
        <Timer />
        <Timer />
        <Timer />
      </ul>
    </div>
  );
};

export default TimerList;
