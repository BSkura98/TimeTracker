import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { differenceInMilliseconds } from "date-fns";

import Form from "./components/Form";
import "./style.scss";
import AdvancedTimer from "./components/AdvancedTimer";
import { GET_TIMERS_ENTRIES } from "../../graphql/queries";
import { setCurrentTimer } from "../../redux/slices/advancedTimers";
import { CREATE_AND_START_TIMER_ENTRY } from "../../graphql/mutations";

const calculateTotalTimersTimes = (timerEntries) =>
  timerEntries?.reduce((timers, timerEntry) => {
    if (timerEntry.endTime) {
      const { timer } = timerEntry;
      timers[timer.name] = timers[timer.name] ?? 0;
      timers[timer.name] += differenceInMilliseconds(
        new Date(timerEntry.endTime),
        new Date(timerEntry.startTime)
      );
    }
    return timers;
  }, {});

const chartColors = [
  "rgba(75,192,192,1)",
  "#f3ba2f",
  "#0b0def",
  "#348B20",
  "#C44CDF",
  "#F59D83",
  "#8C932C",
  "#B3B3F1",
  "#B1EEAA",
  "#95011B",
  "#FC7F1F",
  "#001449",
];

export const AdvancedTimers = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.advancedTimers);
  const { data } = useQuery(GET_TIMERS_ENTRIES, {
    variables: { startTimeDay: state.currentPageDate },
  });
  const [createAndStartTimerEntry, { error: createAndStartTimerEntryError }] =
    useMutation(CREATE_AND_START_TIMER_ENTRY);
  const [entries, setEntries] = useState([]);

  const totalTimersTimes = useMemo(
    () => calculateTotalTimersTimes(data?.timerEntries),
    [data]
  );

  useEffect(() => {
    if (data && data?.timerEntries.length > 0) {
      setEntries(data.timerEntries.filter((entry) => entry.endTime !== null));
      dispatch(
        setCurrentTimer(
          data.timerEntries.find((entry) => entry.endTime === null)
        )
      );
    } else {
      setEntries([]);
    }
  }, [data, dispatch]);

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
              labels: Object.keys(totalTimersTimes ?? {}),
              datasets: [
                {
                  label: "Timer",
                  data: Object.values(totalTimersTimes ?? {}),
                  backgroundColor: chartColors,
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
