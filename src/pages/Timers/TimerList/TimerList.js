import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Timer from "../Timer/Timer";
import "./style.scss";
import { getTimers } from "../../../redux/slices/timers";
import { incrementTimer } from "../../../redux/slices/timers";
import { GET_TIMERS_ENTRIES } from "../../../graphql/queries";

const TimerList = () => {
  // TODO fully replace this state with state which is used for advanced timers page
  const simpleTimersState = useSelector((state) => state.timers);

  const state = useSelector((state) => state.advancedTimers);
  const dispatch = useDispatch();
  // TODO use data to display list of timers fetched from API
  const { data, loading } = useQuery(GET_TIMERS_ENTRIES, {
    variables: { startTimeDay: state.currentPageDate },
  });
  console.log(data);

  useEffect(() => {
    dispatch(getTimers());
  }, [dispatch]);

  useEffect(() => {
    let interv;
    if (simpleTimersState.currentTimer?.id) {
      interv = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }

    return () => clearInterval(interv);
  }, [dispatch, simpleTimersState.currentTimer?.id]);

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
        {simpleTimersState.timers?.map((timer) => (
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
