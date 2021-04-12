import React, { useState } from "react";

import Timer from "./Timer";
import { run, setTime } from "../run";

const TimerList = ({ timers, setTimers }) => {
  const [interv, setInterv] = useState();
  const [currentTimer, setCurrentTimer] = useState({ id: 0 });

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
    <div className="timer-container">
      <ul className="timer-list">
        {timers.map((timer) => (
          <Timer
            key={timer.id}
            setTimers={setTimers}
            timers={timers}
            timer={timer}
            startStopTimer={startStopTimer}
          />
        ))}
      </ul>
    </div>
  );
};

export default TimerList;
