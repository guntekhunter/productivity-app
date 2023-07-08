"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
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
  const theSecond = parseInt(sessionStorage.getItem("timerValue") || "0", 10);
  const theCount = parseInt(sessionStorage.getItem("count") || "0", 10);
  const theName = sessionStorage.getItem("timerName");
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
      sessionStorage.setItem("timerValue", seconds.toString());
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
        sessionStorage.setItem("count", "0");
      }
    }
  }, [theCount, pathname]);

  useEffect(() => {
    if (pathname !== "/pomodoro") {
      if (theName === "pomodoro" && seconds === 0 && theCount !== 8) {
        setSelectedName("short-break");
        sessionStorage.setItem("count", (theCount + 1).toString());
        sessionStorage.setItem("timerValue", "300");
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "pomodoro" && seconds === 0 && theCount === 8) {
        setSelectedName("long-break");
        sessionStorage.setItem("timerValue", "900");
        sessionStorage.setItem("count", "0");
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "short-break" && seconds === 0) {
        setSelectedName("pomodoro");
        sessionStorage.setItem("timerValue", "1500");
        sessionStorage.setItem("count", (theCount + 1).toString());
        dispatch(timeActive(false));
        setNotifAudio(true);
      } else if (theName === "long-break" && seconds === 0) {
        setSelectedName("pomodoro");
        sessionStorage.setItem("timerValue", "1500");
        sessionStorage.setItem("count", "0");
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
      sessionStorage.setItem("timerName", selectedName);
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
