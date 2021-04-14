import React, { useState, useEffect } from "react";
import "./App.css";

import Form from "./components/Form";
import TimerList from "./components/TimerList";
import { run, setTime } from "./run";

export const TimerContext = React.createContext();

function App() {
  const [timerName, setTimerName] = useState("");
  const [timers, setTimers] = useState([]);
  const [interv, setInterv] = useState();
  const [currentTimer, setCurrentTimer] = useState({ id: 0 });

  useEffect(() => {
    let data = localStorage.getItem("timers");
    setTimers(JSON.parse(data));
    console.log(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  const startStopTimer = (timer, timerRemoved) => {
    if (timerRemoved === true) {
      if (timer.id === currentTimer.id) {
        stopTimer();

        setCurrentTimer(undefined);
      }
      return;
    }

    if (timer.id === currentTimer.id) {
      stopTimer();

      setCurrentTimer({ id: 0 });
    } else if (timer.id === 0) {
      startTimer(timer);

      setCurrentTimer(timer);
    } else {
      stopTimer();
      startTimer(timer);

      setCurrentTimer(timer);
    }
  };
  const startTimer = (timer) => {
    setTime(timer);

    setInterv(
      setInterval(() => {
        run(timers, setTimers);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(interv);
  };

  return (
    <TimerContext.Provider value={{ timers, setTimers, startStopTimer }}>
      <div className="App">
        <header>
          <h1>Time Tracker</h1>
        </header>
        <Form
          timers={timers}
          setTimers={setTimers}
          timerName={timerName}
          setTimerName={setTimerName}
        />
        <TimerList />
      </div>
    </TimerContext.Provider>
  );
}

export default App;
