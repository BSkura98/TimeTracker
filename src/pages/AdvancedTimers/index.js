import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "./components/Form";
import "./style.scss";
import AdvancedTimer from "./components/Timer";
import { getTimers } from "../../redux/slices/timers";

const advancedTimers = [
  {
    id: 1,
    name: "Reading a book",
    startTime: "16:30:21",
    endTime: "17:23:08",
  },
  {
    id: 2,
    name: "Watching TV",
    startTime: "17:39:44",
    endTime: "18:27:25",
  },
  {
    id: 3,
    name: "Cooking",
    startTime: "19:55:49",
    endTime: "20:28:50",
  },
];

export const AdvancedTimers = () => {
  const dispatch = useDispatch();

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
          {advancedTimers.map((timer) => (
            <Row>
              <AdvancedTimer key={timer.id} advancedTimer={timer} />
            </Row>
          ))}
        </Col>
      </Container>
    </>
  );
};
