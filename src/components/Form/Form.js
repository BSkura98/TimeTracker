import React, { useContext } from "react";
import BootstrapForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import { TimerContext } from "../../App";
import "./style.scss";
import { PlusIcon } from "../../icons/icons";

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
      <Stack className="add-timer-form-stack" direction="horizontal" gap={3}>
        <BootstrapForm.Control
          value={timerName}
          onChange={inputTextHandler}
          type="text"
          className="timer-input me-auto"
          placeholder="Add timer"
        />
        <Button className="add-timer-button" type="submit" variant="light">
          <PlusIcon />
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
