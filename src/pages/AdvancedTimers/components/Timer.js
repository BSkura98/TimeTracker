import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, ButtonGroup, Form } from "react-bootstrap";

import { editTimerName } from "../../../redux/slices/timers";

const AdvancedTimer = ({ advancedTimer }) => {
  const dispatch = useDispatch();

  return (
    <Card className="timer mb-1">
      <Card.Body className="p-2" style={{ width: "100%" }}>
        <Container>
          <Row>
            <Col xs={6}>
              <Form.Control
                value={advancedTimer.name}
                plaintext
                onChange={(e) =>
                  dispatch(
                    editTimerName({
                      id: advancedTimer.id,
                      name: e.target.value,
                    })
                  )
                }
              />
            </Col>
            <Col xs={4}>
              <span className="timer-time">
                {advancedTimer.startTime} - {advancedTimer.endTime}
              </span>
            </Col>
            <Col xs={2}>
              <ButtonGroup>
                <Button variant="outline">
                  <i className="fas fa-stopwatch"></i>
                </Button>
                <Button variant="outline">
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
