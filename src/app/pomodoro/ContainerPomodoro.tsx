"use client";
import React, { useEffect, useState } from "react";
import Timer from "../components/pomodoroComponent/Timer";
import List from "../components/pomodoroComponent/List";
import Description from "../components/pomodoroComponent/Description";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ContainerPomodoro() {
  // const [timerType, setTimerType] = useState("pomodoro");
  // const callbackButton = async (value: string) => {
  //   setTimerType(value);
  // };

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [seconds, setSeconds] = useState(0);
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
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (starting) {
        setConsumedSeconds((value) => value + 1);
        clockStart();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, starting]);
  return (
    <div>
      <Timer
        stage={stage}
        switchStage={switchStage}
        getTimerTime={getTimerTime}
        seconds={seconds}
        starting={starting}
        setStarting={setStarting}
      />
      <List />
      <Description />
    </div>
    // <div>
    //   <Timer callback={callbackButton} />
    //   <List color={timerType} />
    //   <Description />
    // </div>
  );
}
