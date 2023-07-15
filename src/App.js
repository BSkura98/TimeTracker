import React, { useState, useEffect, useReducer } from "react";
import { Provider as ReduxProvider } from "react-redux";

import "./App.scss";
import Form from "./components/Form/Form";
import TimerList from "./components/TimerList/TimerList";
import { timersReducer } from "./redux/reducers/timersReducer";
import { ClockIcon } from "./icons";
import { getTimers, setCurrentTimer } from "./redux/actions/timer";
import { store } from "./redux/store";

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
  const [state, dispatch] = useReducer(timersReducer, defaultState);

  useEffect(() => {
    dispatch(getTimers());
  }, []);

  const incrementTimer = () => {
    dispatch(incrementTimer());
  };

  const startStopTimer = (timer, timerRemoved) => {
    if (timerRemoved === true) {
      if (timer.id === state.currentTimer.id) {
        stopTimer();

        dispatch(setCurrentTimer({ id: 0 }));
      }
      return;
    }

    if (timer.id === state.currentTimer.id) {
      stopTimer();

      dispatch(setCurrentTimer({ id: 0 }));
    } else if (timer.id === 0) {
      startTimer();

      dispatch(setCurrentTimer(timer));
    } else {
      dispatch(setCurrentTimer(timer));

      stopTimer();
      startTimer();
    }
  };

  const startTimer = () => {
    setInterv(
      setInterval(() => {
        incrementTimer();
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(interv);
  };

  return (
    <TimerContext.Provider value={{ startStopTimer, state, dispatch }}>
      {/* <ReduxProvider store={store}> */}
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
      {/* </ReduxProvider> */}
    </TimerContext.Provider>
  );
}

export default App;
