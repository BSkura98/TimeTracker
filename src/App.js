import React, { useState, useEffect, useReducer } from "react";

import "./App.scss";
import Form from "./components/Form/Form";
import TimerList from "./components/TimerList/TimerList";
import { reducer } from "./reducer";
// import ClockIcon from "./icons/clock.svg";
// import { ReactComponent as ClockIcon } from "./icons/clock.svg";
import { ClockIcon } from "./icons/icons";

export const TimerContext = React.createContext();

const defaultState = {
  timers: [],
  currentTimer: { id: 0 },
  updatedSecond: 0,
  updatedMinute: 0,
  updatedHour: 0,
};

function App() {
  const [timerName, setTimerName] = useState("");
  const [interv, setInterv] = useState();
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: "LOAD_TIMERS" });
  }, []);

  const run = () => {
    dispatch({
      type: "INCREMENT_TIMER",
    });
  };

  const startStopTimer = (timer, timerRemoved) => {
    if (timerRemoved === true) {
      if (timer.id === state.currentTimer.id) {
        console.log("Current timer removed");
        stopTimer();

        dispatch({ type: "SET_CURRENT_TIMER", payload: { id: 0 } });
      }
      return;
    }

    if (timer.id === state.currentTimer.id) {
      console.log("Stop timer");
      stopTimer();

      dispatch({ type: "SET_CURRENT_TIMER", payload: { id: 0 } });
    } else if (timer.id === 0) {
      console.log("Start timer");
      startTimer();

      dispatch({ type: "SET_CURRENT_TIMER", payload: timer });
    } else {
      dispatch({ type: "SET_CURRENT_TIMER", payload: timer });
      console.log("current timer " + JSON.stringify(state.currentTimer));

      stopTimer();
      startTimer();
    }
  };
  const startTimer = () => {
    console.log("startTimer function");

    setInterv(
      setInterval(() => {
        run();
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(interv);
  };

  return (
    <TimerContext.Provider value={{ startStopTimer, state, dispatch }}>
      <div className="App">
        <header>
          <div className="logo fs-2 mb-3">
            <ClockIcon />
            <h1 className="title">Time Tracker</h1>
          </div>
        </header>
        <Form timerName={timerName} setTimerName={setTimerName} />
        <TimerList />
      </div>
    </TimerContext.Provider>
  );
}

export default App;
