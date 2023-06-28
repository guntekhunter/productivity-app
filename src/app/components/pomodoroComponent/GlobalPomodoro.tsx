"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";

export default function GlobalPomodoro() {
  const globalTimer = useSelector((state: RootState) => state.timer.value);

  return (
    <div className="position absolute right-[2rem] transition duration-500 ease-in-out top-[-3rem]  h-full hover:top-0 transition-all">
      <div
        className={`absolute sticky top-0 top-[-2rem] px-[2rem] py-[.5rem] rounded-md mt-3 ${
          globalTimer === "pomodoro"
            ? "bg-red-200"
            : globalTimer === "short-break"
            ? "bg-green-200"
            : "bg-blue-200"
        }`}
      >
        {globalTimer === "pomodoro"
          ? "fokus"
          : globalTimer === "short-break"
          ? "Istirahat"
          : "Istirahat"}
      </div>
    </div>
  );
}
