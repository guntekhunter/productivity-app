"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useSession } from "next-auth/react";
import addNotification from "react-push-notification";
import { usePathname } from "next/navigation";
import { timeActive } from "@/app/GlobalRedux/features/timerActive/timeActiveSlice";

export default function GlobalPomodoro() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const globalTimeActive = useSelector(
    (state: RootState) => state.timeActive.value
  );
  const theSecond = parseInt(localStorage.getItem("timerValue") || "0", 10);
  const [seconds, setSeconds] = useState(theSecond);
  console.log("ahhay");

  useEffect(() => {
    if (globalTimeActive) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      // console.log("ini dalam interval", seconds);

      return () => clearInterval(intervalId);
    }
  }, [globalTimeActive, seconds]);

  useEffect(() => {
    if (pathname === "/pomodoro") {
      localStorage.setItem("timerValue", seconds.toString());
    }
  }, [pathname, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      dispatch(timeActive(false));
    }
  }, [seconds, dispatch]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      setSeconds(theSecond);
    }
    // localStorage.setItem("timerValue", seconds.toString());
  }, [theSecond, pathname]);

  console.log(
    "doekamie",
    parseInt(localStorage.getItem("timerValue") || "0", 10)
  );

  console.log("ini detek", seconds);
  console.log("ini lagi?", theSecond);
  console.log(globalTimeActive);
  // need to set the count to global variable to

  return (
    <div
      className={`position absolute right-[2rem] transition duration-500 ease-in-out top-[-3rem]  h-full hover:top-0 transition-all hidden`}
    >
      <div
        className={`absolute sticky top-0 top-[-2rem] px-[2rem] py-[.5rem] rounded-md mt-3
         `}
      >
        Istirahat
      </div>
    </div>
  );
}
