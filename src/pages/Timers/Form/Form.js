import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BootstrapForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import "./style.scss";
import { PlusIcon } from "../../../icons";
import { addTimer } from "../../../redux/slices/timers";

const Form = () => {
  const dispatch = useDispatch();
  const [timerName, setTimerName] = useState("");

  const inputTextHandler = (e) => {
    setTimerName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addTimer(timerName));
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
