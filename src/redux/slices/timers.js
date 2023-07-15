import { createSlice } from "@reduxjs/toolkit";

const timersSlice = createSlice({
  name: "timers",
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    addTimer(state, action) {
      state.timers.push({
        name: action.payload.name,
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
      state = {
        ...state,
        currentTimer: action.timer,
        updatedSecond: action.timer.s,
        updatedMinute: action.timer.m,
        updatedHour: action.timer.h,
      };
    },
    incrementTimer(state) {
      let h = state.updatedHour;
      let m = state.updatedMinute;
      let s = state.updatedSecond;

      if (m === 60) {
        h++;
        m = 0;
      }
      if (s === 60) {
        m++;
        s = 0;
      }
      s++;

      const newTimers = state.timers.map((item) => {
        if (item.id === state.currentTimer.id) {
          const updatedItem = {
            ...item,
            s: s,
            m: m,
            h: h,
          };
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("timers", JSON.stringify(newTimers));

      state = {
        ...state,
        timers: newTimers,
        updatedSecond: s,
        updatedMinute: m,
        updatedHour: h,
      };
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
  },
});

export const { todoAdded, todoToggled } = timersSlice.actions;
export default timersSlice.reducer;
