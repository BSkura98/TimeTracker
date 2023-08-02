import { createSlice } from "@reduxjs/toolkit";

const advancedTimersSlice = createSlice({
  name: "advancedTimers",
  initialState: {
    // timers: [],
    currentTimer: null,
    updatedSecond: 0,
    updatedMinute: 0,
    updatedHour: 0,
    currentPageDate: new Date(),
  },
  reducers: {
    startTimer(state, action) {
      state.timers.push({
        name: action.payload,
        h: 0,
        m: 0,
        s: 0,
        id: new Date().getTime(),
      });
    },
    setCurrentTimer(state, action) {
      state.currentTimer = action.payload;
    },
    setCurrentPageDate(state, action) {
      state.currentPageDate = action.payload;
    },
  },
});

export const { startTimer, setCurrentTimer, setCurrentPageDate } =
  advancedTimersSlice.actions;
export default advancedTimersSlice.reducer;
