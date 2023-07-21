import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Timer from "../Timer/Timer";
import "./style.scss";
import { getTimers } from "../../redux/slices/timers";

const TimerList = () => {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimers());
  }, [dispatch]);

  return (
    <Container className="timer-list">
      <Col>
        {timers.timers?.map((timer) => (
          <Row>
            <Timer key={timer.id} timer={timer} />
          </Row>
        ))}
      </Col>
    </Container>
  );
};

export default TimerList;
