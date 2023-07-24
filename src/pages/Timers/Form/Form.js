import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BootstrapForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import DatePicker from "react-datepicker";

import "./style.scss";
import { PlusIcon } from "../../../icons";
import { addTimer } from "../../../redux/slices/timers";
import { Container } from "react-bootstrap";

const Form = () => {
  const dispatch = useDispatch();
  const [timerName, setTimerName] = useState("");
  const [date, setDate] = useState(new Date());

  const inputTextHandler = (e) => {
    setTimerName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTimer(timerName));
    setTimerName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container fluid="md">
        <Stack className="add-timer-form-stack" direction="horizontal" gap={2}>
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
          <DatePicker
            showIcon
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </Stack>
      </Container>
    </form>
  );
};

export default Form;
