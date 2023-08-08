import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, ButtonGroup, Form } from "react-bootstrap";

import { editTimerName } from "../../../redux/slices/timers";
import { REMOVE_TIMER_ENTRY } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";

const AdvancedTimer = ({ timerEntry }) => {
  const dispatch = useDispatch();
  const [removeTimerEntry, { error }] = useMutation(REMOVE_TIMER_ENTRY);

  const handleRemoveTimerEntry = (e) => {
    e.preventDefault();
    removeTimerEntry({
      variables: {
        id: timerEntry.id,
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <Card className="timer mb-1">
      <Card.Body className="p-2" style={{ width: "100%" }}>
        <Container>
          <Row>
            <Col xs={6}>
              <Form.Control
                value={timerEntry.timer.name}
                plaintext
                onChange={(e) =>
                  dispatch(
                    editTimerName({
                      id: timerEntry.id,
                      name: e.target.value,
                    })
                  )
                }
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
                <Button variant="outline">
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
