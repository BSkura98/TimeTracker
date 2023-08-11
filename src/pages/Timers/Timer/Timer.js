import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, ButtonGroup, Form } from "react-bootstrap";

import "./style.scss";
import {
  removeTimer,
  setCurrentTimer,
  editTimerName,
} from "../../../redux/slices/timers";
import { formatTime } from "../../../helpers/formatTime";

const Timer = ({ timer }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.timers);

  const deleteHandler = () => {
    dispatch(removeTimer(timer));
    startStopTimer(timer);
  };

  const startStopTimer = (timer) => {
    if (timer.id === state.currentTimer?.id) {
      return dispatch(setCurrentTimer(null));
    }
    dispatch(setCurrentTimer(timer));
  };

  return (
    <Card className="timer mb-1">
      <Card.Body className="p-2" style={{ width: "100%" }}>
        <Container>
          <Row>
            <Col xs={7}>
              <Form.Control
                value={timer.name}
                plaintext
                onChange={(e) =>
                  dispatch(
                    editTimerName({ id: timer.id, name: e.target.value })
                  )
                }
              />
            </Col>
            <Col xs={3}>
              <span className="timer-time">
                {formatTime(timer.h, timer.m, timer.s)}
              </span>
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
