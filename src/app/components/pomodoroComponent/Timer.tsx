"use client";
import React, { useEffect, useState } from "react";
import addNotification from "react-push-notification";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { timer } from "@/app/GlobalRedux/features/timerName/timerSlice";
import { time } from "@/app/GlobalRedux/features/timerTime/timeSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { timeActive } from "@/app/GlobalRedux/features/timerActive/timeActiveSlice";
import Cookies from "js-cookie";

const cycleTimes = [5, 25]; // Cycle times in minutes
const cycleCountLimit = 8;

//@ts-ignore
export default function Timer({ callback }) {
  const globalTimeActive = useSelector(
    (state: RootState) => state.timeActive.value
  );
  const theTime = parseInt(Cookies.get("timerValue") || "0", 10);
  const theCount = parseInt(Cookies.get("count") || "0", 10);
  const [seconds, setSeconds] = useState(theTime);
  const [isActive, setIsActive] = useState(globalTimeActive);
  const [cycleCount, setCycleCount] = useState(theCount);
  const [selectedTime, setSelectedTime] = useState(25);
  const [notifAudio, setNotifAudio] = useState(false);
  const typeTimer = Cookies.get("timerName");
  const [selectedName, setSelectedName] = useState(typeTimer || "");

  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.set("timerName", selectedName);
  }, [selectedName]);

  useEffect(() => {
    const storedValue = Cookies.get("timerValue");
    const storedIsActive = Cookies.get("timerIsActive");

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
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setIsActive(false);

            if (cycleCount === cycleCountLimit) {
              setSeconds(15 * 60);
              setCycleCount(0);
              setSelectedName("long-break");
              Cookies.set("timerName", "long-break");
              callback("long-break");
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
              Cookies.set("timerName", "pomodoro");
              callback("pomodoro");
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
              Cookies.set("timerName", "pomodoro");
              callback("pomodoro");
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
                Cookies.set("timerName", "short-break");
                callback("short-break");
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
                Cookies.set("timerName", "pomodoro");
                callback("pomodoro");
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
                Cookies.set("timerName", "long-break");
                callback("long-break");
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

    Cookies.set("timerValue", seconds.toString());
    Cookies.set("timerIsActive", isActive.toString());

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, cycleCount, selectedName, callback, seconds]);

  const startCountdown = () => {
    setIsActive(!isActive);
    const status = !isActive;
    Cookies.set("timerIsActive", status.toString());
  };

  const changeTime = (time: number, name: string) => {
    if (isActive) {
      alert("Anda yakin mengganti timer, satu sesi belum selesai");
    }
    setSelectedTime(time);
    setSelectedName(name);
    callback(name);
    const theSeconds = time * 60;
    Cookies.set("timerValue", theSeconds.toString());
    setSeconds(parseInt(Cookies.get("timerValue") || "0", 10));
    Cookies.set("timerName", name);
    setIsActive(false);
  };

  useEffect(() => {
    Cookies.set("timerValue", seconds.toString());
  }, [seconds]);

  useEffect(() => {
    dispatch(timer(selectedName));
    dispatch(time(seconds));
    if (selectedName !== null) {
      dispatch(timer(selectedName));
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
    Cookies.set("reset", "true");
    const name = Cookies.get("timerName");
    dispatch(timeActive(false));
    if (name === "short-break") {
      setSelectedTime(5);
      setSelectedName("short-break");
      callback("short-break");
      const theSeconds = 5 * 60;
      Cookies.set("timerValue", theSeconds.toString());
      setSeconds(parseInt(Cookies.get("timerValue") || "0", 10));
      Cookies.set("timerName", "short-break");
      setIsActive(false);
    } else if (name === "long-break") {
      setSelectedTime(15);
      setSelectedName("long-break");
      callback("long-break");
      const theSeconds = 15 * 60;
      Cookies.set("timerValue", theSeconds.toString());
      setSeconds(parseInt(Cookies.get("timerValue") || "0", 10));
      Cookies.set("timerName", "long-break");
      setIsActive(false);
    } else {
      setSelectedTime(25);
      setSelectedName("pomodoro");
      callback("pomodoro");
      const theSeconds = 25 * 60;
      Cookies.set("timerValue", theSeconds.toString());
      setSeconds(parseInt(Cookies.get("timerValue") || "0", 10));
      Cookies.set("timerName", "pomodoro");
      setIsActive(false);
    }
  };

  useEffect(() => {
    Cookies.set("count", cycleCount.toString());
  }, [cycleCount]);

  return (
    <div className="">
      <div className="w-full flex justify-around pt-[2rem]">
        <div
          className={`transition duration-200 ease-in-out ${
            selectedName === "pomodoro"
              ? "bg-red-200"
              : selectedName === "short-break"
              ? "bg-green-200"
              : "bg-blue-200"
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
