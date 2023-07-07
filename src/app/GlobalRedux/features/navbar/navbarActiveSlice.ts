"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface navbarActiveState {
  value: boolean;
}

const initialState: navbarActiveState = {
  value: false,
};

export const navbarActiveSlice = createSlice({
  name: "navbarActive",
  initialState,
  reducers: {
    navbarActive: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { navbarActive } = navbarActiveSlice.actions;
// export const {increment, decrement, incrementByAmount} = navbarrSlice.actions;

export default navbarActiveSlice.reducer;
