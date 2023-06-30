"use client";
import React, { useEffect, useState } from "react";
import addNotification from "react-push-notification";
import { formatTime } from "./TimerFunction";
import { useDispatch } from "react-redux";
import { timer } from "@/app/GlobalRedux/features/timerName/timerSlice";
import { time } from "@/app/GlobalRedux/features/timerTime/timeSlice";

const cycleTimes = [5, 25]; // Cycle times in minutes
const cycleCountLimit = 4;

//@ts-ignore
export default function Timer({ callback }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(25);
  const [notifAudio, setNotifAudio] = useState(false);
  const [selectedName, setSelectedName] = useState("pomodoro");

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

    localStorage.setItem("timerValue", seconds.toString());
    localStorage.setItem("timerIsActive", isActive.toString());

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, cycleCount, selectedName, callback, seconds]);

  console.log("inimi", localStorage.getItem("timerValue"));

  const startCountdown = () => {
    setIsActive(!isActive);
    const status = !isActive;
    localStorage.setItem("timerIsActive", status.toString());
  };

  const changeTime = (time: number, name: string) => {
    setSelectedTime(time);
    setSelectedName(name);
    callback(name);
    setSeconds(time * 60);
    setIsActive(false);
  };

  useEffect(() => {
    dispatch(timer(selectedName));
    dispatch(time(seconds));
    localStorage.setItem("timerName", selectedName);
  }, [selectedName, dispatch, seconds]);

  useEffect(() => {
    if (notifAudio) {
      const audio = new Audio("Nada Dering Telepon Ring.mp3"); // Replace with the actual path to your audio file
      audio.play();

      setTimeout(() => {
        audio.pause();
        setNotifAudio(false);
      }, 3000);
    }
  }, [notifAudio]);

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
          } w-[60%] p-[2rem] rounded-md`}
        >
          <div className="flex justify-around pt-[1.5rem]">
            <div className="flex justify-between w-[60%]">
              <button
                className={`${
                  selectedName === "pomodoro"
                    ? "bg-black text-white"
                    : "hover:bg-opacity-10 hover:bg-black"
                } px-5 py-2 rounded-md `}
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
                } px-5 py-2 rounded-md `}
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
                } px-5 py-2 rounded-md `}
              >
                Break Lama
              </button>
            </div>
          </div>
          <div className="w-full flex justify-around">
            <div className="text-[8rem] font-bold">{formatTime(seconds)}</div>
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
        </div>
      </div>
    </div>
  );
}
