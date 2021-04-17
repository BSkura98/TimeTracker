import React, { useState, useEffect, useReducer } from "react";
import "./App.css";

import Form from "./components/Form";
import TimerList from "./components/TimerList";
import { reducer } from "./reducer";

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

  var updatedSecond = 0,
    updatedMinute = 0,
    updatedHour = 0;
  var timerId = 0;

  const setTime = (timer) => {
    updatedSecond = timer.s;
    updatedMinute = timer.m;
    updatedHour = timer.h;
    timerId = timer.id;
  };

  const run = () => {
    /*console.log("run function");
    console.log(state.currentTimer.id);
    if (updatedMinute === 60) {
      updatedHour++;
      updatedMinute = 0;
    }
    if (updatedSecond === 60) {
      updatedMinute++;
      updatedSecond = 0;
    }
    updatedSecond++;

    var newTimers = state.timers.map((item) => {
      if (item.id === state.currentTimer.id) {
        const updatedItem = {
          ...item,
          s: updatedSecond,
          m: updatedMinute,
          h: updatedHour,
        };
        return updatedItem;
      }
      return item;
    });
    dispatch({ type: "SAVE_TIMERS", payload: newTimers });*/
    dispatch({ type: "INCREMENT_TIMER" });
    console.log("x");
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
      startTimer(timer);

      dispatch({ type: "SET_CURRENT_TIMER", payload: timer });
    } else {
      dispatch({ type: "SET_CURRENT_TIMER", payload: timer });
      console.log("current timer " + JSON.stringify(state.currentTimer));

      stopTimer();
      startTimer(timer);
    }
  };
  const startTimer = (timer) => {
    console.log("startTimer function");
    setTime(timer);

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
          <h1>Time Tracker</h1>
        </header>
        <Form
          //timers={timers}
          //setTimers={setTimers}
          timerName={timerName}
          setTimerName={setTimerName}
        />
        <TimerList />
      </div>
    </TimerContext.Provider>
  );
}

export default App;
