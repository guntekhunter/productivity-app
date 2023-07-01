"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useSession } from "next-auth/react";
import {
  setMinutes,
  setSecond,
} from "@/app/GlobalRedux/features/timerTime/timeSlice";

export default function GlobalPomodoro() {
  const { data: session } = useSession();
  const [minutes, setMinutes] = useState(
    parseInt(localStorage.getItem("minutes") || "0", 10)
  );
  const [seconds, setSeconds] = useState(
    localStorage.getItem("seconds") || "0"
  );
  const [starting, setStarting] = useState(
    localStorage.getItem("active") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("minutes", minutes.toString());
    localStorage.setItem("active", starting.toString());
    setStarting(localStorage.getItem("active") === "true" ? true : false);
  }, [seconds, minutes, starting]);

  const globalTimer = useSelector((state: RootState) => state.time.active);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (starting) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = parseInt(prevSeconds, 10) - 1;
          if (newSeconds < 0) {
            // If seconds reach 0, decrement minutes and set seconds to 59
            setMinutes((prevMinutes) => prevMinutes - 1);
            return "59";
          }
          return newSeconds.toString().padStart(2, "0");
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [starting]);

  return (
    <div
      className={`position absolute right-[2rem] transition duration-500 ease-in-out h-full hover:top-0 transition-all ${
        session ? "" : "hidden"
      }`}
    >
      <div
        className={`absolute sticky top-0 top-[-2rem] px-[2rem] py-[.5rem] rounded-md mt-3 bg-blue-200`}
      >
        {minutes}:{seconds}
      </div>
    </div>
  );
}
