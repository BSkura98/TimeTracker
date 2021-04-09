import React from "react";

import Timer from "./Timer";

const TimerList = ({ timers }) => {
  return (
    <div className="timer-container">
      <ul className="timer-list">
        {timers.map((timer) => (
          <Timer key={timer.id} timer={timer} />
        ))}
      </ul>
    </div>
  );
};

export default TimerList;
