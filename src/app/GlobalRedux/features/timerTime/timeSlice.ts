"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface timeState {
  value: number;
}

const initialState: timeState = {
  value: 0,
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    time: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { time } = timeSlice.actions;
// export const {increment, decrement, incrementByAmount} = timerSlice.actions;

export default timeSlice.reducer;
