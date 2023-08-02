import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
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

export const AdvancedTimers = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.timers);
  const { error, loading, data } = useQuery(GET_TIMERS_ENTRIES, {
    variables: { startTimeDay: state.currentPageDate },
  });
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (data) {
      setEntries(data.timerEntries);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getTimers());
  }, [dispatch]);

  return (
    <>
      <Form />
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
              <AdvancedTimer key={entry.id} timerEntry={entry} />
            </Row>
          ))}
        </Col>
      </Container>
    </>
  );
};
