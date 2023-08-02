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
    //   localStorage.setItem("timers", JSON.stringify(state.timers));
    },
  },
});

export const {
  startTimer,
} = advancedTimersSlice.actions;
export default advancedTimersSlice.reducer;
