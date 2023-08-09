import { createSlice } from "@reduxjs/toolkit";

const advancedTimersSlice = createSlice({
  name: "advancedTimers",
  initialState: {
    currentTimer: null,
    currentPageDate: new Date(),
    formTimerName: ""
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
    }
  },
});

export const { setCurrentTimer, setCurrentPageDate, setFormTimerName } =
  advancedTimersSlice.actions;
export default advancedTimersSlice.reducer;
