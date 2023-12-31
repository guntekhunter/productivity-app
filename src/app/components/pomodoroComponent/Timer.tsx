"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { timer } from "@/app/GlobalRedux/features/timerName/timerSlice";
import { time } from "@/app/GlobalRedux/features/timerTime/timeSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { timeActive } from "@/app/GlobalRedux/features/timerActive/timeActiveSlice";

const cycleTimes = [5, 25]; // Cycle times in minutes
const cycleCountLimit = 8;

//@ts-ignore
export default function Timer({ callback }) {
  const globalTimeActive = useSelector(
    (state: RootState) => state.timeActive.value
  );
  let theTimes: any;
  let theCounts: any;
  let typeTimers: any;
  if (typeof window !== "undefined") {
    theTimes = parseInt(localStorage.getItem("timerValue") || "0", 1500);
    theCounts = parseInt(localStorage.getItem("count") || "0", 10);
    typeTimers = localStorage.getItem("timerName");
  } else {
    console.log("you are in a server");
  }
  const theTime = theTimes;
  const theCount = theCounts;
  const typeTimer = typeTimers;
  const [seconds, setSeconds] = useState(theTime || 25 * 60);
  const [isActive, setIsActive] = useState(globalTimeActive || false);
  const [cycleCount, setCycleCount] = useState(theCount || 0);
  const [selectedTime, setSelectedTime] = useState(25);
  const [notifAudio, setNotifAudio] = useState(false);
  const [selectedName, setSelectedName] = useState(typeTimer || "pomodoro");

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timerName", selectedName);
    }
  }, [selectedName]);

  useEffect(() => {
    const storedValue = localStorage.getItem("timerValue");
    const storedIsActive = localStorage.getItem("timerIsActive");

    if (storedValue && storedIsActive) {
      setSeconds(parseInt(storedValue, 10));
      setIsActive(globalTimeActive);
    }
  }, [globalTimeActive]);

  useEffect(() => {
    dispatch(timeActive(isActive));
  }, [isActive, dispatch]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds: number) => {
          if (prevSeconds === 0) {
            setIsActive(false);

            if (cycleCount === cycleCountLimit) {
              setSeconds(15 * 60);
              setCycleCount(0);
              setSelectedName("long-break");
              localStorage.setItem("timerName", "long-break");
              callback("long-break");
              setNotifAudio(true);
              return 15 * 60;
            } else if (selectedName === "short-break") {
              const nextCycleSeconds = cycleTimes[1] * 60;
              setSeconds(nextCycleSeconds);
              setCycleCount((prevCount: number) => prevCount + 1);
              setSelectedName("pomodoro");
              localStorage.setItem("timerName", "pomodoro");
              callback("pomodoro");
              setNotifAudio(true);
              return nextCycleSeconds;
            } else if (selectedName === "long-break") {
              const nextCycleSeconds = cycleTimes[1] * 60;
              setSeconds(nextCycleSeconds);
              setCycleCount((prevCount: number) => prevCount + 1);
              setSelectedName("pomodoro");
              localStorage.setItem("timerName", "pomodoro");
              callback("pomodoro");
              setNotifAudio(true);
              return nextCycleSeconds;
            } else {
              const nextCycleIndex = cycleCount % cycleTimes.length;
              const nextCycleSeconds = cycleTimes[nextCycleIndex] * 60;
              if (nextCycleIndex === 0) {
                setSelectedName("short-break");
                localStorage.setItem("timerName", "short-break");
                callback("short-break");

                setNotifAudio(true);
              } else if (nextCycleIndex === 1) {
                setSelectedName("pomodoro");
                localStorage.setItem("timerName", "pomodoro");
                callback("pomodoro");

                setNotifAudio(true);
              } else {
                setSelectedName("long-break");
                localStorage.setItem("timerName", "long-break");
                callback("long-break");

                setNotifAudio(true);
              }
              setSeconds(nextCycleSeconds);
              setCycleCount((prevCount: number) => prevCount + 1);
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
  }, [isActive, cycleCount, selectedName, callback, seconds]);

  const startCountdown = () => {
    setIsActive(!isActive);
    const status = !isActive;
    localStorage.setItem("timerIsActive", status.toString());
  };

  const changeTime = (time: number, name: string) => {
    if (isActive) {
      alert("Anda yakin mengganti timer, satu sesi belum selesai");
    }
    setSelectedTime(time);
    setSelectedName(name);
    callback(name);
    const theSeconds = time * 60;
    localStorage.setItem("timerValue", theSeconds.toString());
    setSeconds(parseInt(localStorage.getItem("timerValue") || "0", 10));
    localStorage.setItem("timerName", name);
    setIsActive(false);
  };

  useEffect(() => {
    localStorage.setItem("timerValue", seconds.toString());
  }, [seconds]);

  useEffect(() => {
    dispatch(timer(selectedName));
    dispatch(time(seconds));
    if (selectedName !== null) {
      dispatch(timer(selectedName));
      // localStorage.setItem("timerName", selectedName);
    }
  }, [selectedName, dispatch, seconds]);

  useEffect(() => {
    if (notifAudio) {
      const audio = new Audio("Nada Dering Telepon Ring.mp3");
      audio.play();

      setTimeout(() => {
        audio.pause();
        setNotifAudio(false);
      }, 3000);
    }
  }, [notifAudio]);

  const reset = () => {
    localStorage.setItem("reset", "true");
    const name = localStorage.getItem("timerName");
    dispatch(timeActive(false));
    if (name === "short-break") {
      setSelectedTime(5);
      setSelectedName("short-break");
      callback("short-break");
      const theSeconds = 5 * 60;
      localStorage.setItem("timerValue", theSeconds.toString());
      setSeconds(parseInt(localStorage.getItem("timerValue") || "0", 10));
      localStorage.setItem("timerName", "short-break");
      setIsActive(false);
    } else if (name === "long-break") {
      setSelectedTime(15);
      setSelectedName("long-break");
      callback("long-break");
      const theSeconds = 15 * 60;
      localStorage.setItem("timerValue", theSeconds.toString());
      setSeconds(parseInt(localStorage.getItem("timerValue") || "0", 10));
      localStorage.setItem("timerName", "long-break");
      setIsActive(false);
    } else {
      setSelectedTime(25);
      setSelectedName("pomodoro");
      callback("pomodoro");
      const theSeconds = 25 * 60;
      localStorage.setItem("timerValue", theSeconds.toString());
      setSeconds(parseInt(localStorage.getItem("timerValue") || "0", 10));
      localStorage.setItem("timerName", "pomodoro");
      setIsActive(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("count", cycleCount.toString());
  }, [cycleCount]);

  return (
    <div className="">
      <div className="w-full flex justify-around pt-[2rem]">
        <div
          className={`transition duration-200 ease-in-out ${
            selectedName === "pomodoro"
              ? "bg-red-200 dark:bg-[#BB5757]"
              : selectedName === "short-break"
              ? "bg-green-200 dark:bg-[#3E905C]"
              : "bg-blue-200 dark:bg-[#6F8297]"
          } md:w-[60%] w-[90%] p-[2rem] rounded-md`}
        >
          <div className="flex justify-around pt-[1.5rem] ">
            <div className="flex justify-between md:w-[60%] w-full md:text-[1rem] text-[.8rem]">
              <button
                className={`${
                  selectedName === "pomodoro"
                    ? "bg-black text-white"
                    : "hover:bg-opacity-10 hover:bg-black"
                } md:px-5 md:py-2 px-2 py-2 rounded-md `}
                onClick={() => {
                  changeTime(25, "pomodoro");
                }}
              >
                Pomodoro
              </button>
              <button
                className={`${
                  selectedName === "short-break"
                    ? "bg-black text-white"
                    : "hover:bg-opacity-10 hover:bg-black"
                } md:px-5 md:py-2 px-2 py-2 rounded-md `}
                onClick={() => {
                  changeTime(5, "short-break");
                }}
              >
                Break Singkat
              </button>
              <button
                onClick={() => {
                  changeTime(15, "long-break");
                }}
                className={`${
                  selectedName === "long-break"
                    ? "bg-black text-white"
                    : "hover:bg-opacity-10 hover:bg-black"
                } md:px-5 md:py-2 px-2 py-2 rounded-md `}
              >
                Break Lama
              </button>
            </div>
          </div>
          <div className="w-full flex justify-around">
            <div className="md:text-[8rem] text-[7rem] font-bold">
              {formatTime(seconds)}
            </div>
          </div>
          <div className="flex justify-around py-[2rem]">
            <button
              onKeyDown={(e) => {
                if (e.code === "Space") {
                  e.preventDefault();
                  setIsActive(!isActive);
                  startCountdown;
                }
              }}
              onClick={startCountdown}
              className="bg-black text-white text-[3rem] font-bold w-[25rem] rounded-md"
            >
              {isActive ? <p>PAUSE</p> : <p>START</p>}
            </button>
          </div>
          <div className="flex justify-around">
            <button
              onKeyDown={(e) => {
                if (e.code === "Space") {
                  e.preventDefault();
                  reset();
                }
              }}
              onClick={reset}
              className="bg-white text-black text-[3rem] font-bold w-[25rem] rounded-md"
            >
              <p>RESET</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
