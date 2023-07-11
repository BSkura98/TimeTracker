import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import "./style.scss";

import { TimerContext } from "../../App";

const Timer = ({ timer }) => {
  const { startStopTimer, dispatch } = useContext(TimerContext);

  const deleteHandler = () => {
    dispatch({ type: "REMOVE_TIMER", payload: timer });
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
      <Button
        onClick={() => {
          startStopTimer(timer);
        }}
        variant="success"
        className="item-button rounded-circle"
      >
        <i className="fas fa-stopwatch"></i>
      </Button>
      <Button onClick={deleteHandler} variant="danger" className="item-button rounded-circle">
        <i className="fas fa-trash"></i>
      </Button>
    </div>
  );
};

export default Timer;
