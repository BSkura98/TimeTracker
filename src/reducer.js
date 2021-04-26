export const reducer = (state, action) => {
  if (action.type === "ADD_TIMER") {
    console.log("ADD_TIMER");
    const timers = [...state.timers, action.payload];
    localStorage.setItem("timers", JSON.stringify(timers));
    return { ...state, timers };
  }
  if (action.type === "LOAD_TIMERS") {
    console.log("LOAD_TIMERS");
    const newTimers = localStorage.getItem("timers");
    console.log(
      "timers: " + { ...state, timers: JSON.parse(newTimers) }.timers
    );
    return { ...state, timers: JSON.parse(newTimers) };
  }
  if (action.type === "SAVE_TIMERS") {
    console.log("SAVE_TIMERS");
    console.log("SAVE_TIMERS old currentTimer id " + state.currentTimer.id);
    localStorage.setItem("timers", JSON.stringify(state.timers));
    return state;
  }
  if (action.type === "REMOVE_TIMER") {
    console.log("REMOVE_TIMER");
    const timers = state.timers.filter(
      (timer) => timer.id !== action.payload.id
    );
    localStorage.setItem("timers", JSON.stringify(timers));
    return {
      ...state,
      timers: timers,
    };
  }
  if (action.type === "SET_CURRENT_TIMER") {
    console.log("SET_CURRENT_TIMER");
    console.log(
      "SET_CURRENT_TIMER old currentTimer id " + state.currentTimer.id
    );
    const timer = action.payload;
    const newState = { ...state, currentTimer: timer };
    console.log(
      "SET_CURRENT_TIMER new currentTimer id " + newState.currentTimer.id
    );
    return newState;
  }
  if (action.type === "INCREMENT_TIMER") {
    var h = state.updatedHour,
      m = state.updatedMinute,
      s = state.updatedSecond;

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

    return {
      ...state,
      timers: newTimers,
      updatedSecond: s,
      updatedMinute: m,
      updatedHour: h,
    };
  }

  throw new Error("no matching action type");
};
