import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import "./App.scss";
import Form from "./components/Form/Form";
import TimerList from "./components/TimerList/TimerList";
import { ClockIcon } from "./icons";
import { store } from "./redux/store";

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <header>
          <div className="logo fs-2 mb-3">
            <ClockIcon />
            <h1 className="title">Time Tracker</h1>
          </div>
        </header>
        <Form />
        <TimerList />
      </div>
    </ReduxProvider>
  );
}

export default App;
