import React from "react";

const Timer = ({ timer }) => {
  return (
    <div className="timer">
      <li className="timer-item">{timer.name}</li>
      <li>00:00</li>
      <button className="start-btn">
        <i className="fas fa-stopwatch"></i>
      </button>
      <button className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Timer;
