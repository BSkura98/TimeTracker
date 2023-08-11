import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapForm from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";

import { PlayIcon, StopIcon } from "../../../icons";
import { STOP_TIMER_ENTRY } from "../../../graphql/mutations";
import {
  incrementCurrentTimerTime,
  resetCurrentTimerTime,
  setCurrentPageDate,
  setCurrentTimer,
  setFormTimerName,
} from "../../../redux/slices/advancedTimers";
import { GET_TIMERS_ENTRIES } from "../../../graphql/queries";
import { formatTime } from "../../../helpers/formatTime";

const Form = ({ startTimer }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.advancedTimers);
  const [stopTimerEntry, { error: stopTimerEntryError }] = useMutation(
    STOP_TIMER_ENTRY,
    { refetchQueries: [GET_TIMERS_ENTRIES] }
  );

  useEffect(() => {
    dispatch(setFormTimerName(state.currentTimer?.timer?.name));
  }, [state.currentTimer, dispatch]);

  const handleAddTimerInput = (e) => {
    dispatch(setFormTimerName(e.target.value));
  };

  const handleChangeDate = (e) => {
    e.preventDefault();
    dispatch(setCurrentPageDate(new Date(e.target.value)));
  };

  const handleStartTimer = async (e) => {
    e.preventDefault();
    startTimer(state.formTimerName);
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
      dispatch(setFormTimerName(""));
      dispatch(setCurrentTimer(null));
    }
  };

  useEffect(() => {
    let interv;

    if (state.currentTimer?.id) {
      interv = setInterval(() => {
        dispatch(incrementCurrentTimerTime());
      }, 1000);
    }

    return () => {
      clearInterval(interv);
      dispatch(resetCurrentTimerTime());
    };
  }, [dispatch, state.currentTimer]);

  return (
    <div className="add-timer-form-container">
      <Container fluid="md">
        <Stack className="add-timer-form-stack" direction="horizontal" gap={1}>
          <form
            onSubmit={state.currentTimer ? handleStopTimer : handleStartTimer}
          >
            <BootstrapForm.Control
              value={state.formTimerName}
              onChange={handleAddTimerInput}
              type="text"
              className="timer-input me-auto"
              placeholder="Timer"
            />
            <Button type="submit" variant="light">
              {state.currentTimer ? <StopIcon /> : <PlayIcon />}
            </Button>
          </form>
          <div className="current-timer-time">
            {state.currentTimer
              ? formatTime(
                  state.currentTimerTime.hour,
                  state.currentTimerTime.minute,
                  state.currentTimerTime.second
                )
              : ""}
          </div>
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
