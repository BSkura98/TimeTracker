import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Timer from "../Timer/Timer";
import "./style.scss";
import { getTimers } from "../../../redux/slices/timers";
import { calculateTotalTimersTimes } from "../../../helpers/calculateTotalTimersTimes";

const TimerList = ({ entries, loading }) => {
  const dispatch = useDispatch();

  const totalTimersTimes = useMemo(
    () => calculateTotalTimersTimes(entries),
    [entries]
  );

  useEffect(() => {
    dispatch(getTimers());
  }, [dispatch]);

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
