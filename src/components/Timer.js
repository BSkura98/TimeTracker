import React, { useState } from "react";
import { run, setTime } from "./run";

const Timer = ({ timer, timers, setTimers }) => {
  const [interv, setInterv] = useState();
  const [started, setStarted] = useState(false);

  const deleteHandler = () => {
    setTimers(timers.filter((t) => t.id !== timer.id));
  };

  const startHandler = () => {
    setTime(timer);

    setInterv(
      setInterval(() => {
        run(timers, setTimers);
      }, 1000)
    );
    setStarted(true);
  };

  const stopHandler = () => {
    clearInterval(interv);
    setStarted(false);
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
        onClick={started ? stopHandler : startHandler}
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
