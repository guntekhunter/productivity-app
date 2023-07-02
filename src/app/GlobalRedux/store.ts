"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterTimer from "./features/timerName/timerSlice";
import counterTime from "./features/timerTime/timeSlice";
import counterActive from "./features/timerActive/timeActiveSlice";
import counterNavbar from "./features/navbar/navbarActiveSlice";

export const store = configureStore({
  reducer: {
    timer: counterTimer,
    time: counterTime,
    timeActive: counterActive,
    navbar: counterNavbar,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
