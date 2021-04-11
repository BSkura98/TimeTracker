import React from "react";

const Timer = ({ timer, timers, setTimers }) => {
  const deleteHandler = () => {
    setTimers(timers.filter((t) => t.id !== timer.id));
  };

  return (
    <div className="timer">
      <li className="timer-item">{timer.name}</li>
      <li>00:00</li>
      <button className="start-btn">
        <i className="fas fa-stopwatch"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Timer;
