export const addTimer = (timerName) => ({
  type: "ADD_TIMER",
  payload: {
    name: timerName,
    h: 0,
    m: 0,
    s: 0,
    id: new Date().getTime(),
  },
});

export const getTimers = () => ({ type: "LOAD_TIMERS" });

export const setCurrentTimer = (timer) => ({
  type: "SET_CURRENT_TIMER",
  payload: timer,
});

export const incrementTimer = () => ({
  type: "INCREMENT_TIMER",
});

export const removeTimer = (timer) => ({
  type: "REMOVE_TIMER",
  payload: timer,
});
