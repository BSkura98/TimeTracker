import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, ButtonGroup, Form } from "react-bootstrap";

import {
  EDIT_TIMER_ENTRY,
  REMOVE_TIMER_ENTRY,
} from "../../../graphql/mutations";
import { setFormTimerName } from "../../../redux/slices/advancedTimers";
import { GET_TIMERS_ENTRIES } from "../../../graphql/queries";

const AdvancedTimer = ({ timerEntry, startTimer }) => {
  const dispatch = useDispatch();
  const [removeTimerEntry, { error: removeTimerEntryError }] = useMutation(
    REMOVE_TIMER_ENTRY,
    {
      refetchQueries: [GET_TIMERS_ENTRIES],
    }
  );
  const [editTimerEntry, { error: editTimerEntryError }] = useMutation(
    EDIT_TIMER_ENTRY,
    {
      refetchQueries: [GET_TIMERS_ENTRIES],
    }
  );
  const [timerName, setTimerName] = useState(timerEntry.timer.name);

  const handleRemoveTimerEntry = (e) => {
    e.preventDefault();
    removeTimerEntry({
      variables: {
        id: timerEntry.id,
      },
    });

    if (removeTimerEntryError) {
      console.log(removeTimerEntryError);
    }
  };

  const handleStartTimer = (e) => {
    e.preventDefault();
    dispatch(setFormTimerName(timerEntry.timer.name));
    startTimer(timerEntry.timer.name);
  };

  const handleEditTimerName = () => {
    editTimerEntry({
      variables: {
        id: timerEntry.id,
        timerName,
      },
    });

    if (editTimerEntryError) {
      console.log(removeTimerEntryError);
    }
  };

  return (
    <Card className="timer mb-1">
      <Card.Body className="p-2" style={{ width: "100%" }}>
        <Container>
          <Row>
            <Col xs={6}>
              <Form.Control
                value={timerName}
                plaintext
                onChange={(e) => setTimerName(e.target.value)}
                onBlur={handleEditTimerName}
              />
            </Col>
            <Col xs={4}>
              <span className="timer-time">
                {new Date(timerEntry.startTime).toTimeString().split(" ")[0]} -{" "}
                {new Date(timerEntry.endTime).toTimeString().split(" ")[0]}
              </span>
            </Col>
            <Col xs={2}>
              <ButtonGroup>
                <Button variant="outline" onClick={handleStartTimer}>
                  <i className="fas fa-stopwatch"></i>
                </Button>
                <Button variant="outline" onClick={handleRemoveTimerEntry}>
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

export default AdvancedTimer;
