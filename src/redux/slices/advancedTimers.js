import { createSlice } from "@reduxjs/toolkit";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
import { getTimeForMilliseconds } from "../../helpers/getTimeForMilliseconds";

const advancedTimersSlice = createSlice({
  name: "advancedTimers",
  initialState: {
    currentTimer: null,
    currentTimerTime: {
      hour: 0,
      minute: 0,
      second: 0,
    },
    currentPageDate: new Date(),
    formTimerName: "",
  },
  reducers: {
    setCurrentTimer(state, action) {
      state.currentTimer = action.payload;
    },
    setCurrentPageDate(state, action) {
      state.currentPageDate = action.payload;
    },
    setFormTimerName(state, action) {
      state.formTimerName = action.payload;
    },
    incrementCurrentTimerTime(state) {
      let hours = state.currentTimerTime.hour;
      let minutes = state.currentTimerTime.minute;
      let seconds = state.currentTimerTime.second + 1;

      if (seconds > 59) {
        minutes++;
        seconds = 0;
      }
      if (minutes > 59) {
        hours++;
        minutes = 0;
      }

      state.currentTimerTime.second = seconds;
      state.currentTimerTime.minute = minutes;
      state.currentTimerTime.hour = hours;
    },
    calculateCurrentTimerTime(state, action) {
      let milliseconds = differenceInMilliseconds(
        new Date(),
        new Date(action.payload)
      );

      state.currentTimerTime = getTimeForMilliseconds(milliseconds);
    },
    resetCurrentTimerTime(state) {
      state.currentTimerTime = {
        hour: 0,
        minute: 0,
        second: 0,
      };
    },
  },
});

export const {
  setCurrentTimer,
  setCurrentPageDate,
  setFormTimerName,
  incrementCurrentTimerTime,
  calculateCurrentTimerTime,
  resetCurrentTimerTime,
} = advancedTimersSlice.actions;
export default advancedTimersSlice.reducer;
