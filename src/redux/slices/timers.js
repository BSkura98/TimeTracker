import { createSlice } from "@reduxjs/toolkit";

const timersSlice = createSlice({
  name: "timers",
  initialState: {
    timers: [],
    currentTimer: null,
    updatedSecond: 0,
    updatedMinute: 0,
    updatedHour: 0,
    timerRunning: false,
  },
  reducers: {
    addTimer(state, action) {
      state.timers.push({
        name: action.payload,
        h: 0,
        m: 0,
        s: 0,
        id: new Date().getTime(),
      });
      localStorage.setItem("timers", JSON.stringify(state.timers));
    },
    getTimers(state) {
      const timersFromLocalStorage = localStorage.getItem("timers");
      return { ...state, timers: JSON.parse(timersFromLocalStorage) ?? [] };
    },
    setCurrentTimer(state, action) {
      state.currentTimer = action.payload;
      if (action.payload) {
        state.updatedSecond = action.payload.s;
        state.updatedMinute = action.payload.m;
        state.updatedHour = action.payload.h;
      }
    },
    incrementTimer(state) {
      let hours = state.updatedHour;
      let minutes = state.updatedMinute;
      let seconds = state.updatedSecond;

      if (minutes === 60) {
        hours++;
        minutes = 0;
      }
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      seconds++;

      const newTimers = state.timers.map((item) => {
        if (item.id === state.currentTimer.id) {
          const updatedItem = {
            ...item,
            s: seconds,
            m: minutes,
            h: hours,
          };
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("timers", JSON.stringify(newTimers));

      state.timers = newTimers;
      state.updatedSecond = seconds;
      state.updatedMinute = minutes;
      state.updatedHour = hours;
    },
    removeTimer(state, action) {
      const timers = state.timers.filter(
        (timer) => timer.id !== action.payload.id
      );
      localStorage.setItem("timers", JSON.stringify(timers));
      state = {
        ...state,
        timers,
      };
    },
    setTimerRunning(state, action) {
      state.timerRunning = action.payload;
    },
  },
});

export const {
  addTimer,
  getTimers,
  setCurrentTimer,
  incrementTimer,
  removeTimer,
  setTimerRunning,
} = timersSlice.actions;
export default timersSlice.reducer;
