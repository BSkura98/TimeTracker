import React from "react";

import Timer from "./Timer";

const TimerList = ({ timers, setTimers }) => {
  return (
    <div className="timer-container">
      <ul className="timer-list">
        {timers.map((timer) => (
          <Timer
            key={timer.id}
            setTimers={setTimers}
            timers={timers}
            timer={timer}
          />
        ))}
      </ul>
    </div>
  );
};

export default TimerList;
