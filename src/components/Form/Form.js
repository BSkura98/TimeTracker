import React, { useContext } from "react";

import { TimerContext } from "../../App";

const Form = ({ timerName, setTimerName }) => {
  const { dispatch } = useContext(TimerContext);

  const inputTextHandler = (e) => {
    setTimerName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TIMER",
      payload: {
        name: timerName,
        h: 0,
        m: 0,
        s: 0,
        id: new Date().getTime(),
      },
    });
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
