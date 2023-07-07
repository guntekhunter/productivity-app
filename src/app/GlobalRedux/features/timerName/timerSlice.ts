"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface timerState {
  value: any;
}

const initialState: timerState = {
  value: "",
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    timer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { timer } = timerSlice.actions;
// export const {increment, decrement, incrementByAmount} = timerSlice.actions;

export default timerSlice.reducer;
