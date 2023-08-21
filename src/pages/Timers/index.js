import React from "react";

import Form from "./Form/Form";
import TimerList from "./TimerList/TimerList";
import "./style.scss";

export const SimpleTimers = () => {
  return (
    <>
      <Form />
      <div className="advanced-timers-page-content">
        <TimerList />
      </div>
    </>
  );
};
