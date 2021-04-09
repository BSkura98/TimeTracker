import React, { useState, useEffect } from "react";
import "./App.css";

import Form from "./components/Form";
import TimerList from "./components/TimerList";

function App() {
  const [timerName, setTimerName] = useState("");
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("timers");
    setTimers(JSON.parse(data));
    console.log(data);
  }, []);
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  return (
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
      <TimerList timers={timers} />
    </div>
  );
}

export default App;
