import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Timer from "../Timer/Timer";
import { TimerContext } from "../../App";
import "./style.scss";

const TimerList = () => {
  const { state } = useContext(TimerContext);

  return (
    <Container className="timer-list">
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
