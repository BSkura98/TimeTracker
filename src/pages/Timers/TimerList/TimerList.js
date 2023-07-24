import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Timer from "../Timer/Timer";
import "./style.scss";
import { getTimers } from "../../../redux/slices/timers";
import { incrementTimer } from "../../../redux/slices/timers";

const TimerList = () => {
  const state = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimers());
  }, [dispatch]);

  useEffect(() => {
    let interv;
    if (state.currentTimer?.id) {
      interv = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }

    return () => clearInterval(interv);
  }, [dispatch, state.currentTimer?.id]);

  return (
    <Container className="timer-list" fluid="md">
      <Col>
        {state.timers?.map((timer) => (
          <Row>
            <Timer key={timer.id} timer={timer} />
          </Row>
        ))}
      </Col>
    </Container>
  );
};

export default TimerList;
