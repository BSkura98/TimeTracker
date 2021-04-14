import React, { useContext } from "react";

import Timer from "./Timer";
import { TimerContext } from "../App";

const TimerList = () => {
  const { timers, setTimers } = useContext(TimerContext);

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
