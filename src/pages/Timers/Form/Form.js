import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapForm from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";

import "./style.scss";
import { addTimer } from "../../../redux/slices/timers";
import { setCurrentPageDate } from "../../../redux/slices/advancedTimers";

const Form = () => {
  const dispatch = useDispatch();
  const [timerName, setTimerName] = useState("");
  const state = useSelector((state) => state.advancedTimers);

  const handleAddTimerInput = (e) => {
    setTimerName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTimer(timerName));
    setTimerName("");
  };

  const handleChangeDate = (e) => {
    e.preventDefault();
    dispatch(setCurrentPageDate(new Date(e.target.value)));
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
              placeholder="Add timer"
            />
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
