"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { timeActive } from "@/app/GlobalRedux/features/timerActive/timeActiveSlice";

export default function GlobalPomodoro() {
  const [notifAudio, setNotifAudio] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const globalTimeActive = useSelector(
    (state: RootState) => state.timeActive.value
  );
  let theSeconds: any;
  let theCounts: any;
  let theNames: any;
  if (typeof window !== "undefined") {
    theSeconds = parseInt(localStorage.getItem("timerValue") || "0", 10);
    theCounts = parseInt(localStorage.getItem("count") || "0", 10);
    theNames = localStorage.getItem("timerName");
  }
  const theSecond = theSeconds;
  const theCount = theCounts;
  const theName = theNames;
  const [seconds, setSeconds] = useState(theSecond || 25 * 60);
  const [selectedName, setSelectedName] = useState(theName || "pomodoro");

  useEffect(() => {
    if (globalTimeActive) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [globalTimeActive, seconds]);

  useEffect(() => {
    if (pathname === "/pomodoro") {
      if (typeof window !== "undefined") {
        localStorage.setItem("timerValue", seconds.toString());
      }
    }
  }, [pathname, seconds]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      setSeconds(theSecond);
    }
  }, [theSecond, pathname]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      if (theCount > 4) {
        if (typeof window !== "undefined") {
          localStorage.setItem("count", "0");
        }
      }
    }
  }, [theCount, pathname]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      if (theName === "pomodoro" && seconds === 0 && theCount !== 8) {
        setSelectedName("short-break");
        // localStorage.setItem("timerName", "short-break");
        if (typeof window !== "undefined") {
          localStorage.setItem("count", (theCount + 1).toString());
          localStorage.setItem("timerValue", "300");
        }
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "pomodoro" && seconds === 0 && theCount === 8) {
        setSelectedName("long-break");
        // localStorage.setItem("timerName", "long-break");
        if (typeof window !== "undefined") {
          localStorage.setItem("timerValue", "900");
          localStorage.setItem("count", "0");
        }
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "short-break" && seconds === 0) {
        setSelectedName("pomodoro");
        // localStorage.setItem("timerName", "pomodoro");
        if (typeof window !== "undefined") {
          localStorage.setItem("timerValue", "1500");
          localStorage.setItem("count", (theCount + 1).toString());
        }
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "long-break" && seconds === 0) {
        setSelectedName("pomodoro");
        // localStorage.setItem("timerName", "pomodoro");
        if (typeof window !== "undefined") {
          localStorage.setItem("timerValue", "1500");
          localStorage.setItem("count", "0");
        }
        dispatch(timeActive(false));
        setNotifAudio(true);
      }
    }
  }, [dispatch, theCount, theName, seconds, pathname]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      if (notifAudio) {
        const audio = new Audio("Nada Dering Telepon Ring.mp3");
        audio.play();

        setTimeout(() => {
          audio.pause();
          setNotifAudio(false);
        }, 3000);
      }
    }
  }, [notifAudio, pathname]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      if (typeof window !== "undefined") {
        localStorage.setItem("timerName", selectedName);
      }
    }
  }, [selectedName, pathname]);

  useEffect(() => {
    setSelectedName(theName || "");
  }, [theName]);

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
