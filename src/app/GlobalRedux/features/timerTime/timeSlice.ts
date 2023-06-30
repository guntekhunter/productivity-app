"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface timeState {
  minutes: number;
  seconds: number;
  name: string;
}

const initialState: timeState = {
  minutes: 0,
  seconds: 0,
  name: "",
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setMinutes: (state, action) => {
      state.minutes = action.payload;
    },
    setSecond: (state, action) => {
      state.seconds = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setMinutes, setSecond, setName } = timeSlice.actions;
// export const {increment, decrement, incrementByAmount} = timerSlice.actions;

export default timeSlice.reducer;
