import { configureStore } from "@reduxjs/toolkit";

import timersReducer from "./slices/timers";
import advancedTimersReducer from "./slices/advancedTimers";

export const store = configureStore({
  reducer: {
    timers: timersReducer,
    advancedTimers: advancedTimersReducer,
  },
});
