import React, { useEffect, useContext } from "react";

import { TimerContext } from "../App";

const Timer = ({ timer }) => {
  const { startStopTimer, dispatch } = useContext(TimerContext);

  const deleteHandler = () => {
    dispatch({ type: "REMOVE_TIMER", payload: timer });
    //setTimers(timers.filter((t) => t.id !== timer.id));
    startStopTimer(timer, true);
  };

  const displayTime = () => {
    let h = timer.h >= 10 ? timer.h : "0" + timer.h;
    let m = timer.m >= 10 ? timer.m : "0" + timer.m;
    let s = timer.s >= 10 ? timer.s : "0" + timer.s;
    return h + ":" + m + ":" + s;
  };

  return (
    <div className="timer">
      <li className="timer-item">{timer.name}</li>
      <li>{displayTime()}</li>
      <button
        onClick={() => {
          startStopTimer(timer);
        }}
        className="start-btn"
      >
        <i className="fas fa-stopwatch"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Timer;
