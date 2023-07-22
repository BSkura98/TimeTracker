import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.scss";
import { Timers } from "./pages/Timers";
import { Navbar } from "./components/NavBar";
import { DetailedTimers } from "./pages/DetailedTimers";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/timers" element={<Timers />} />
          <Route path="/detailedTimer" element={<DetailedTimers />} />
          <Route path="/" element={<Navigate to="/timers" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
