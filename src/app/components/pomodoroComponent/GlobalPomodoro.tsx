"use client";
import React, { useEffect } from "react";
import { formatTime } from "./TimerFunction";

export default function GlobalPomodoro() {
  const storedValue = localStorage.getItem("timerValue");
  const timer = storedValue ? parseInt(storedValue, 10) : 0;
  console.log(storedValue);

  console.log(timer);

  return (
    <div className="position absolute right-[5rem] top-[6rem]  h-full">
      <div className="absolute font-bold sticky top-3 bg-red-200 px-[2rem] py-[1rem] rounded-md">
        {formatTime(timer)}
      </div>
    </div>
  );
}
