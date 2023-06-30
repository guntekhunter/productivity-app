"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useSession } from "next-auth/react";
import addNotification from "react-push-notification";
import {
  setMinutes,
  setSecond,
} from "@/app/GlobalRedux/features/timerTime/timeSlice";

export default function GlobalPomodoro() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const minutes = useSelector((state: RootState) => state.time.minutes);
  const second = useSelector((state: RootState) => state.time.seconds);

  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [seconds, setSeconds] = useState(second);
  const [consumedSeconds, setConsumedSeconds] = useState(0);
  const [starting, setStarting] = useState(false);

  const [stage, setStage] = useState(0);

  const switchStage = (index: React.SetStateAction<number>) => {
    const isYes =
      consumedSeconds && stage !== index
        ? confirm(
            "Yakin ingin mengganti waktu timer?. Satu sesi belum berakhir"
          )
        : false;

    if (isYes) {
      reset();
      setStage(index);
    } else if (!consumedSeconds) {
      setStage(index);
    }
  };

  const getTimerTime = () => {
    const timeStage: { [key: number]: number } = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };

    dispatch(setMinutes(timeStage[stage]));
    return timeStage[stage];
  };

  const UpdateMinute = () => {
    const updateStage: {
      [key: number]: React.Dispatch<React.SetStateAction<number>>;
    } = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };

    return updateStage[stage];
  };

  const reset = () => {
    setConsumedSeconds(0);
    setSeconds(0);
    setStarting(false);
    setPomodoro(25);
    setShortBreak(5);
    setLongBreak(15);
  };

  const clockStart = () => {
    const minutes = getTimerTime();
    const setMinutes = UpdateMinute();

    if (minutes === 0 && seconds === 0) {
      reset();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);

      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }

    dispatch(setSecond(second));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (starting) {
        setConsumedSeconds((value) => value + 1);
        clockStart();
      }
    }, 1000);

    dispatch(setSecond(seconds));

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, starting]);

  console.log(minutes);
  console.log(second);
  return (
    <div
      className={`position absolute right-[2rem] transition duration-500 ease-in-out top-[-3rem]  h-full hover:top-0 transition-all ${
        session ? "" : "hidden"
      }`}
    >
      <div
        className={`absolute sticky top-0 top-[-2rem] px-[2rem] py-[.5rem] rounded-md mt-3 bg-blue-200`}
      >
        Istirahat
      </div>
    </div>
  );
}
