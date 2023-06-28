"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterTimer from "./features/timerName/timerSlice";

export const store = configureStore({
  reducer: {
    timer: counterTimer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
