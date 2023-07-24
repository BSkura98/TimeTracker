import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BootstrapForm from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { addTimer } from "../../../redux/slices/timers";
import { PlayIcon } from "../../../icons";

const Form = () => {
  const dispatch = useDispatch();
  const [timerName, setTimerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAddTimerInput = (e) => {
    setTimerName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTimer(timerName));
    setTimerName("");
  };

  return (
    <div className="add-timer-form-container">
      <Container fluid="md">
        <Stack className="add-timer-form-stack" direction="horizontal" gap={5}>
          <form onSubmit={handleSubmit}>
            <BootstrapForm.Control
              value={timerName}
              onChange={handleAddTimerInput}
              type="text"
              className="timer-input me-auto"
              placeholder="Timer"
            />
            <Button className="add-timer-button" type="submit" variant="light">
              <PlayIcon />
            </Button>
          </form>
          <BootstrapForm.Control
            type="date"
            className="timers-date"
            value={date}
            onChange={(e) => {
              e.preventDefault();
              setDate(e.target.value);
            }}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default Form;
