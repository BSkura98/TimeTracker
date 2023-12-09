import React, { useMemo } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Timer from "../Timer/Timer";
import "./style.scss";
import { calculateTotalTimersTimes } from "../../../helpers/calculateTotalTimersTimes";

const TimerList = ({ entries, loading }) => {
  const totalTimersTimes = useMemo(
    () => calculateTotalTimersTimes(entries),
    [entries]
  );

  const getLoadingContent = () => (
    <div>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const getLoadedContent = () => (
    <Container className="timer-list" fluid="md">
      <Col>
        {totalTimersTimes?.map((timer) => (
          <Row>
            <Timer key={timer.id} timer={timer} />
          </Row>
        ))}
      </Col>
    </Container>
  );

  return loading ? getLoadingContent() : getLoadedContent();
};

export default TimerList;
