import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";

// import Form from "./Form/Form";
import TimerList from "./TimerList/TimerList";
import "./style.scss";
import { GET_TIMERS_ENTRIES } from "../../graphql/queries";
import {
  setCurrentTimer,
  setFormTimerName,
} from "../../redux/slices/advancedTimers";
import Form from "../../components/CurrentTimer";
import { CREATE_AND_START_TIMER_ENTRY } from "../../graphql/mutations";

export const SimpleTimers = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.advancedTimers);
  const { data, loading } = useQuery(GET_TIMERS_ENTRIES, {
    variables: { startTimeDay: state.currentPageDate },
  });
  const [createAndStartTimerEntry, { error: createAndStartTimerEntryError }] =
    useMutation(CREATE_AND_START_TIMER_ENTRY);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (data && data?.timerEntries.length > 0) {
      setEntries(data.timerEntries.filter((entry) => entry.endTime !== null));
      if (!state.currentTimer) {
        dispatch(
          setCurrentTimer(
            data.timerEntries.find((entry) => entry.endTime === null)
          )
        );
      }
    } else {
      setEntries([]);
    }
  }, [data, dispatch, state.currentTimer]);

  useEffect(() => {
    dispatch(setFormTimerName(state.currentTimer?.timer?.name));
  }, [state.currentTimer, dispatch]);

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
      <div className="simple-timers-page-content">
        <TimerList entries={entries} loading={loading} />
      </div>
    </>
  );
};
