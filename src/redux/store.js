import { configureStore } from "@reduxjs/toolkit";

import advancedTimersReducer from "./slices/advancedTimers";

export const store = configureStore({
  reducer: {
    advancedTimers: advancedTimersReducer,
  },
});
