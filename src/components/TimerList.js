import React, { useContext } from "react";

import Timer from "./Timer";
import { TimerContext } from "../App";

const TimerList = () => {
  const { state } = useContext(TimerContext);

  return (
    <div className="timer-container">
      <ul className="timer-list">
        {state.timers.map((timer) => (
          <Timer key={timer.id} timer={timer} />
        ))}
      </ul>
    </div>
  );
};

export default TimerList;
