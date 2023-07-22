import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.scss";
import { SimpleTimers } from "./pages/Timers";
import { Navbar } from "./components/NavBar";
import { AdvancedTimers } from "./pages/AdvancedTimers";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/timers" element={<SimpleTimers />} />
          <Route path="/advancedTimers" element={<AdvancedTimers />} />
          <Route path="/" element={<Navigate to="/timers" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
