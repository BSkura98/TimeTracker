import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, ButtonGroup, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import "./style.scss";
import {
  removeTimer,
  setCurrentTimer,
  editTimerName,
} from "../../../redux/slices/timers";
import { formatTime } from "../../../helpers/formatTime";
import { getTimeForMilliseconds } from "../../../helpers/getTimeForMilliseconds";
import { setFormTimerName } from "../../../redux/slices/advancedTimers";
import { CREATE_AND_START_TIMER_ENTRY } from "../../../graphql/mutations";

const Timer = ({ timer, startTime }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.timers);
  const time = useMemo(() => getTimeForMilliseconds(timer.time), [timer]);
  const [createAndStartTimerEntry, { error: createAndStartTimerEntryError }] =
    useMutation(CREATE_AND_START_TIMER_ENTRY);

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

  const handleStartTimer = async (e) => {
    e.preventDefault();
    dispatch(setFormTimerName(timer.name));
    const result = await createAndStartTimerEntry({
      variables: {
        startTime: new Date(),
        timerName: timer.name,
      },
    });

    if (createAndStartTimerEntryError) {
      console.log(createAndStartTimerEntryError);
    } else {
      dispatch(setCurrentTimer(result.data.createTimerEntry));
    }
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
                {formatTime(time.hour, time.minute, time.second)}
              </span>
            </Col>
            <Col xs={2}>
              <ButtonGroup>
                <Button onClick={handleStartTimer} variant="outline">
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
