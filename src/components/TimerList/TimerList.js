import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Timer from "../Timer/Timer";
import "./style.scss";

const TimerList = () => {
  const timers = useSelector((state) => state.timers);

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
