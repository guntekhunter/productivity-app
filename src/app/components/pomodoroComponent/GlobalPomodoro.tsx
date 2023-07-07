"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useSession } from "next-auth/react";
import addNotification from "react-push-notification";
import { usePathname } from "next/navigation";
import { timeActive } from "@/app/GlobalRedux/features/timerActive/timeActiveSlice";
import Cookies from "js-cookie";

export default function GlobalPomodoro() {
  const [notifAudio, setNotifAudio] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const globalTimeActive = useSelector(
    (state: RootState) => state.timeActive.value
  );
  const theSecond = parseInt(Cookies.get("timerValue") || "0", 10);
  const theCount = parseInt(Cookies.get("count") || "0", 10);
  const theName = Cookies.get("timerName");
  const [seconds, setSeconds] = useState(theSecond);
  const [selectedName, setSelectedName] = useState(theName || "");

  useEffect(() => {
    if (globalTimeActive) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [globalTimeActive, seconds]);

  useEffect(() => {
    if (pathname === "/pomodoro") {
      Cookies.set("timerValue", seconds.toString());
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
        Cookies.set("count", "0");
      }
    }
  }, [theCount, pathname]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      if (theName === "pomodoro" && seconds === 0 && theCount !== 8) {
        setSelectedName("short-break");
        // Cookies.set("timerName", "short-break");
        Cookies.set("count", (theCount + 1).toString());
        Cookies.set("timerValue", "300");
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "pomodoro" && seconds === 0 && theCount === 8) {
        setSelectedName("long-break");
        // Cookies.set("timerName", "long-break");
        Cookies.set("timerValue", "900");
        Cookies.set("count", "0");
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "short-break" && seconds === 0) {
        setSelectedName("pomodoro");
        // Cookies.set("timerName", "pomodoro");
        Cookies.set("timerValue", "1500");
        Cookies.set("count", (theCount + 1).toString());
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "long-break" && seconds === 0) {
        setSelectedName("pomodoro");
        // Cookies.set("timerName", "pomodoro");
        Cookies.set("timerValue", "1500");
        Cookies.set("count", "0");
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
      Cookies.set("timerName", selectedName);
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
