import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "./components/Form";
import "./style.scss";
import AdvancedTimer from "./components/AdvancedTimer";
import { getTimers } from "../../redux/slices/timers";
import { GET_TIMERS_ENTRIES } from "../../graphql/queries";
import { setCurrentTimer } from "../../redux/slices/advancedTimers";
import { CREATE_AND_START_TIMER_ENTRY } from "../../graphql/mutations";

export const AdvancedTimers = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.advancedTimers);
  const { data } = useQuery(GET_TIMERS_ENTRIES, {
    variables: { startTimeDay: state.currentPageDate },
  });
  const [createAndStartTimerEntry, { error: createAndStartTimerEntryError }] =
    useMutation(CREATE_AND_START_TIMER_ENTRY);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (data && data?.timerEntries.length > 0) {
      setEntries(data.timerEntries.filter((entry) => entry.endTime !== null));
      const currentTimer = data.timerEntries.find(
        (entry) => entry.endTime === null
      );
      dispatch(setCurrentTimer(currentTimer));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(getTimers());
  }, [dispatch]);

  const startTimer = async (timerName) => {
    const result = await createAndStartTimerEntry({
      variables: {
        startTime: new Date(),
        timerName,
      },
    });

    if (createAndStartTimerEntryError) {
      console.log(createAndStartTimerEntryError);
    } else {
      dispatch(setCurrentTimer(result.data.createTimerEntry));
    }
  };

  return (
    <>
      <Form startTimer={startTimer} />
      <Container fluid="md" className="advanced-timers-container">
        <div className="chart-container">
          <Pie
            data={{
              labels: ["Reading a book", "Watching TV", "Cooking"],
              datasets: [
                {
                  label: "Timer",
                  data: [20, 18, 12],
                  backgroundColor: ["rgba(75,192,192,1)", "#0b0def", "#f3ba2f"],
                },
              ],
            }}
          />
        </div>
        <Col>
          {entries.map((entry) => (
            <Row>
              <AdvancedTimer
                key={entry.id}
                timerEntry={entry}
                startTimer={startTimer}
              />
            </Row>
          ))}
        </Col>
      </Container>
    </>
  );
};
