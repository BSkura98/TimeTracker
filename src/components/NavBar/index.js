import React from "react";

import { ClockIcon } from "../../icons";

export const Navbar = () => {
  return (
    <header>
      <div className="logo fs-2 mb-3">
        <ClockIcon />
        <h1 className="title">Time Tracker</h1>
      </div>
    </header>
  );
};
