import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapForm from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { addTimer, setCurrentPageDate } from "../../../redux/slices/timers";
import { PlayIcon } from "../../../icons";

const Form = () => {
  const dispatch = useDispatch();
  const [timerName, setTimerName] = useState("");
  const state = useSelector((state) => state.timers);

  const handleAddTimerInput = (e) => {
    setTimerName(e.target.value);
  };

  const handleChangeDate = (e) => {
    e.preventDefault();
    dispatch(setCurrentPageDate(new Date(e.target.value)));
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
            value={state.currentPageDate.toISOString().split("T")[0]}
            onChange={handleChangeDate}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default Form;
