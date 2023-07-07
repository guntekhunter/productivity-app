"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface timeActiveState {
  value: boolean;
}

const initialState: timeActiveState = {
  value: false,
};

export const timeActiveSlice = createSlice({
  name: "timeActive",
  initialState,
  reducers: {
    timeActive: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { timeActive } = timeActiveSlice.actions;
// export const {increment, decrement, incrementByAmount} = timerSlice.actions;

export default timeActiveSlice.reducer;
