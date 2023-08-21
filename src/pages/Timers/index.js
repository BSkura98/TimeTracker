import React from "react";

import Form from "./Form/Form";
import TimerList from "./TimerList/TimerList";
import "./style.scss";

export const SimpleTimers = () => {
  return (
    <>
      <Form />
      <div className="simple-timers-page-content">
        <TimerList />
      </div>
    </>
  );
};
