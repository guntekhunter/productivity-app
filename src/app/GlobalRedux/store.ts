"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterTime from "./features/timerTime/timeSlice";

export const store = configureStore({
  reducer: {
    time: counterTime,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
