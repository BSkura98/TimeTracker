import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import Form from "./Form/Form";
import TimerList from "./TimerList/TimerList";
import "./style.scss";
import { GET_TIMERS_ENTRIES } from "../../graphql/queries";
import {
  setCurrentTimer,
  setFormTimerName,
} from "../../redux/slices/advancedTimers";

export const SimpleTimers = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.advancedTimers);
  const { data, loading } = useQuery(GET_TIMERS_ENTRIES, {
    variables: { startTimeDay: state.currentPageDate },
  });
  const [entries, setEntries] = useState([]);

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

  useEffect(() => {
    dispatch(setFormTimerName(state.currentTimer?.timer?.name));
  }, [state.currentTimer, dispatch]);

  return (
    <>
      <Form />
      <div className="simple-timers-page-content">
        <TimerList entries={entries} loading={loading} />
      </div>
    </>
  );
};
