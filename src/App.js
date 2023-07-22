import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { SimpleTimers } from "./pages/Timers";
import { NavBar } from "./components/NavBar";
import { AdvancedTimers } from "./pages/AdvancedTimers";
import { NotFound } from "./pages/NotFound";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          >
            <Route path="/timers" element={<SimpleTimers />} />
            <Route path="/advancedTimers" element={<AdvancedTimers />} />
            <Route path="/" element={<Navigate to="/timers" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
