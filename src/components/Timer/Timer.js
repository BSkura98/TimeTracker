import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, ButtonGroup, Form } from "react-bootstrap";

import "./style.scss";
import { TimerContext } from "../../App";
import { removeTimer } from "../../redux/actions/timer";

const Timer = ({ timer }) => {
  const { startStopTimer, dispatch } = useContext(TimerContext);

  const deleteHandler = () => {
    dispatch(removeTimer(timer));
    startStopTimer(timer, true);
  };

  const getTimerTime = () => {
    let h = timer.h >= 10 ? timer.h : "0" + timer.h;
    let m = timer.m >= 10 ? timer.m : "0" + timer.m;
    let s = timer.s >= 10 ? timer.s : "0" + timer.s;
    return h + ":" + m + ":" + s;
  };

  return (
    <Card className="timer mb-1">
      <Card.Body className="p-2" style={{ width: "100%" }}>
        <Container>
          <Row>
            <Col xs={6}>
              <Form.Control defaultValue={timer.name} plaintext />
            </Col>
            <Col xs={4} className="timer-time">
              {getTimerTime()}
            </Col>
            <Col xs={2}>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    startStopTimer(timer);
                  }}
                  variant="outline"
                >
                  <i className="fas fa-stopwatch"></i>
                </Button>
                <Button onClick={deleteHandler} variant="outline">
                  <i className="fas fa-trash"></i>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Timer;
