import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMutation } from "@apollo/client";

import "./style.scss";
import { formatTime } from "../../../helpers/formatTime";
import { getTimeForMilliseconds } from "../../../helpers/getTimeForMilliseconds";
import {
  setCurrentTimer,
  setFormTimerName,
} from "../../../redux/slices/advancedTimers";
import { CREATE_AND_START_TIMER_ENTRY } from "../../../graphql/mutations";

const Timer = ({ timer }) => {
  const dispatch = useDispatch();
  const time = useMemo(() => getTimeForMilliseconds(timer.time), [timer]);
  const [createAndStartTimerEntry, { error: createAndStartTimerEntryError }] =
    useMutation(CREATE_AND_START_TIMER_ENTRY);

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
            <Col xs={8}>
              <span>{timer.name}</span>
            </Col>
            <Col xs={3}>
              <span className="timer-time">
                {formatTime(time.hour, time.minute, time.second)}
              </span>
            </Col>
            <Col xs={1}>
              <Button onClick={handleStartTimer} variant="outline">
                <i className="fas fa-stopwatch"></i>
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Timer;
