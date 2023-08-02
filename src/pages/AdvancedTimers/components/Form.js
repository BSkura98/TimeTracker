import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapForm from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";

import { PlayIcon, StopIcon } from "../../../icons";
import {
  CREATE_AND_START_TIMER_ENTRY,
  STOP_TIMER_ENTRY,
} from "../../../graphql/mutations";
import {
  setCurrentPageDate,
  setCurrentTimer,
} from "../../../redux/slices/advancedTimers";

const Form = () => {
  const dispatch = useDispatch();
  const [timerName, setTimerName] = useState("");
  const state = useSelector((state) => state.advancedTimers);
  const [createAndStartTimerEntry, { error: createAndStartTimerEntryError }] =
    useMutation(CREATE_AND_START_TIMER_ENTRY);
  const [stopTimerEntry, { error: stopTimerEntryError }] =
    useMutation(STOP_TIMER_ENTRY);

  useEffect(() => {
    setTimerName(state.currentTimer?.timer?.name);
  }, [state.currentTimer]);

  const handleAddTimerInput = (e) => {
    setTimerName(e.target.value);
  };

  const handleChangeDate = (e) => {
    e.preventDefault();
    dispatch(setCurrentPageDate(new Date(e.target.value)));
  };

  const handleStartTimer = async (e) => {
    e.preventDefault();
    const result = await createAndStartTimerEntry({
      variables: {
        startTime: new Date(),
        timerName,
      },
    });

    if (createAndStartTimerEntryError) {
      console.log(createAndStartTimerEntryError);
    } else {
      dispatch(setCurrentTimer(result.data.createTimerEntry));
    }
  };

  const handleStopTimer = (e) => {
    e.preventDefault();
    stopTimerEntry({
      variables: {
        id: state.currentTimer.id,
        endTime: new Date(),
      },
    });

    if (stopTimerEntryError) {
      console.log(stopTimerEntryError);
    } else {
      setTimerName("");
    }
  };

  return (
    <div className="add-timer-form-container">
      <Container fluid="md">
        <Stack className="add-timer-form-stack" direction="horizontal" gap={5}>
          <form
            onSubmit={state.currentTimer ? handleStopTimer : handleStartTimer}
          >
            <BootstrapForm.Control
              value={timerName}
              onChange={handleAddTimerInput}
              type="text"
              className="timer-input me-auto"
              placeholder="Timer"
            />
            <Button type="submit" variant="light">
              {state.currentTimer ? <StopIcon /> : <PlayIcon />}
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
