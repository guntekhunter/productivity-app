"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useSession } from "next-auth/react";
import addNotification from "react-push-notification";

const cycleTimes = [5, 25]; // Cycle times in minutes
const cycleCountLimit = 4;

export default function GlobalPomodoro() {
  const globalTimeActive = useSelector(
    (state: RootState) => state.timeActive.value
  );
  const theTime = parseInt(localStorage.getItem("timerValue") || "0", 10);
  const typeTimer = localStorage.getItem("timerName");
  const [seconds, setSeconds] = useState(theTime);
  const [isActive, setIsActive] = useState(globalTimeActive);
  const [cycleCount, setCycleCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(25);
  const [notifAudio, setNotifAudio] = useState(false);
  const [selectedName, setSelectedName] = useState(typeTimer);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedValue = localStorage.getItem("timerValue");
    const storedIsActive = localStorage.getItem("timerIsActive");

    if (storedValue && storedIsActive) {
      setSeconds(parseInt(storedValue, 10));
      setIsActive(storedIsActive === "true");
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setIsActive(false);

            if (cycleCount === cycleCountLimit) {
              setSeconds(15 * 60);
              setCycleCount(0);
              setSelectedName("long-break");
              // callback("long-break");
              addNotification({
                title: "ISTIRAHAT",
                subtitle: "Istirahat",
                message: "Waktunya Istirahat",
                theme: "darkblue",
                native: false,
                duration: 6000,
              });
              setNotifAudio(true);
              return 15 * 60;
            } else if (selectedName === "short-break") {
              const nextCycleSeconds = cycleTimes[1] * 60;
              setSeconds(nextCycleSeconds);
              setCycleCount((prevCount) => prevCount + 1);
              setSelectedName("pomodoro");
              // callback("pomodoro");
              addNotification({
                title: "FOKUS",
                subtitle: "Fokus",
                message: "Waktunya Fokus",
                theme: "darkblue",
                native: false,
                duration: 6000,
              });
              setNotifAudio(true);
              return nextCycleSeconds;
            } else if (selectedName === "long-break") {
              const nextCycleSeconds = cycleTimes[1] * 60;
              setSeconds(nextCycleSeconds);
              setCycleCount((prevCount) => prevCount + 1);
              setSelectedName("pomodoro");
              // callback("pomodoro");
              addNotification({
                title: "FOKUS",
                subtitle: "Fokus",
                message: "Waktunya Fokus",
                theme: "darkblue",
                native: false,
                duration: 6000,
              });
              setNotifAudio(true);
              return nextCycleSeconds;
            } else {
              const nextCycleIndex = cycleCount % cycleTimes.length;
              const nextCycleSeconds = cycleTimes[nextCycleIndex] * 60;
              if (nextCycleIndex === 0) {
                setSelectedName("short-break");
                // callback("short-break");
                addNotification({
                  title: "ISTIRAHAT",
                  subtitle: "Istirahat",
                  message: "Waktunya Istirahat",
                  theme: "darkblue",
                  native: false,
                  duration: 6000,
                });
                setNotifAudio(true);
              } else if (nextCycleIndex === 1) {
                setSelectedName("pomodoro");
                // callback("pomodoro");
                addNotification({
                  title: "FOKUS",
                  subtitle: "Fokus",
                  message: "Waktunya Fokus",
                  theme: "darkblue",
                  native: false,
                  duration: 6000,
                });
                setNotifAudio(true);
              } else {
                setSelectedName("long-break");
                // callback("long-break");
                addNotification({
                  title: "ISTIRAHAT",
                  subtitle: "Istirahat",
                  message: "Waktunya Istirahat",
                  theme: "darkblue",
                  native: false,
                  duration: 6000,
                });
                setNotifAudio(true);
              }
              setSeconds(nextCycleSeconds);
              setCycleCount((prevCount) => prevCount + 1);
              setNotifAudio(true);
              return nextCycleSeconds;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    localStorage.setItem("timerValue", seconds.toString());
    localStorage.setItem("timerIsActive", isActive.toString());

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, cycleCount, selectedName, seconds]);

  const { data: session } = useSession();
  const globalTimer = useSelector((state: RootState) => state.timer.value);
  const globalTime = useSelector((state: RootState) => state.time.value);

  console.log();

  // need to set the count to global variable to

  return (
    <div
      className={`position absolute right-[2rem] transition duration-500 ease-in-out top-[-3rem]  h-full hover:top-0 transition-all ${
        session ? "" : "hidden"
      }`}
    >
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
