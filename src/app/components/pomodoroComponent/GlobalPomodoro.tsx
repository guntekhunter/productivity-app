"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";

export default function GlobalPomodoro() {
  const [timerName, setTimerName] = useState(localStorage.getItem("timerName"));

  useEffect(() => {
    const handleStorageChange = () => {
      setTimerName(localStorage.getItem("timerName"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className="position absolute right-[2rem] top-[-10rem]  h-full hover:top-0 transition duration-500 ease-in-out">
      <div
        className={`absolute  sticky top-[-2.5rem] px-[2rem] py-[1rem] rounded-md mt-3 ${
          timerName === "pomodoro"
            ? "bg-red-200"
            : timerName === "short-break"
            ? "bg-green-200"
            : "bg-blue-200"
        }`}
      >
        fokus
      </div>
    </div>
  );
}
