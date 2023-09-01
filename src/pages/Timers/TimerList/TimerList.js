import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Timer from "../Timer/Timer";
import "./style.scss";
import { getTimers } from "../../../redux/slices/timers";
import { calculateTotalTimersTimes } from "../../../helpers/calculateTotalTimersTimes";
import {
  calculateCurrentTimerTime,
  incrementCurrentTimerTime,
  resetCurrentTimerTime,
} from "../../../redux/slices/advancedTimers";

const TimerList = ({ entries, loading }) => {
  // TODO fully replace this state with state which is used for advanced timers page
  const simpleTimersState = useSelector((state) => state.timers);

  const state = useSelector((state) => state.advancedTimers);
  const dispatch = useDispatch();

  const totalTimersTimes = useMemo(
    () => calculateTotalTimersTimes(entries),
    [entries]
  );

  useEffect(() => {
    dispatch(getTimers());
  }, [dispatch]);

  useEffect(() => {
    let interv;

    if (state.currentTimer?.id) {
      dispatch(calculateCurrentTimerTime(state.currentTimer?.startTime));
      interv = setInterval(() => {
        dispatch(incrementCurrentTimerTime());
      }, 1000);
    }

    return () => {
      clearInterval(interv);
      dispatch(resetCurrentTimerTime());
    };
  }, [dispatch, state.currentTimer]);

  const getLoadingContent = () => (
    <div>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const getLoadedContent = () => (
    <Container className="timer-list" fluid="md">
      <Col>
        {totalTimersTimes?.map((timer) => (
          <Row>
            <Timer key={timer.id} timer={timer} />
          </Row>
        ))}
      </Col>
    </Container>
  );

  return loading ? getLoadingContent() : getLoadedContent();
};

export default TimerList;
