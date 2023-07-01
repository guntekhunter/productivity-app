"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterTime from "./features/timerTime/timeSlice";
import counterActive from "./features/timerActive/timeActiveSlice";

export const store = configureStore({
  reducer: {
    time: counterTime,
    timeActive: counterActive,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
