import React from "react";

const Form = ({ timerName, setTimerName, timers, setTimers }) => {
  const inputTextHandler = (e) => {
    console.log(e.target.value);
    setTimerName(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setTimers([
      ...timers,
      { name: timerName, time: 0, id: new Date().getTime().toString() },
    ]);
    setTimerName("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        value={timerName}
        onChange={inputTextHandler}
        type="text"
        className="timer-input"
      />
      <button className="add-timer-button" type="submit">
        <i className="fas fa-plus-circle"></i>
      </button>
    </form>
  );
};

export default Form;
