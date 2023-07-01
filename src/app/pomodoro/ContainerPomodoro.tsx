"use client";
import React, { useEffect, useState } from "react";
import Timer from "../components/pomodoroComponent/Timer";
import List from "../components/pomodoroComponent/List";
import Description from "../components/pomodoroComponent/Description";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import timeSlice, {
  setActive,
  setMinutes,
  setSecond,
} from "../GlobalRedux/features/timerTime/timeSlice";
import { RootState } from "../GlobalRedux/store";

export default function ContainerPomodoro() {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  const isActive = useSelector((state: RootState) => state.timeActive.value);

  const [stage, setStage] = useState(
    parseInt(localStorage.getItem("name") || "0", 10)
  );

  const [pomodoro, setPomodoro] = useState(
    stage === 0 ? parseInt(localStorage.getItem("minutes") || "0", 10) : 25
  );
  const [shortBreak, setShortBreak] = useState(
    stage === 1 ? parseInt(localStorage.getItem("minutes") || "0", 10) : 5
  );
  const [longBreak, setLongBreak] = useState(
    stage === 2 ? parseInt(localStorage.getItem("minutes") || "0", 10) : 15
  );
  const [seconds, setSeconds] = useState(
    parseInt(localStorage.getItem("seconds") || "0", 10)
  );
  const [consumedSeconds, setConsumedSeconds] = useState(0);
  const [starting, setStarting] = useState(false);

  console.log(isActive);

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

  useEffect(() => {
    localStorage.setItem("seconds", seconds.toString());
    localStorage.setItem("name", stage.toString());

    const secondsInteger = localStorage.getItem("seconds");
    const nameInteger = parseInt(localStorage.getItem("name") || "0", 10);

    setSecond(secondsInteger);
    setStage(nameInteger);
  }, [stage, seconds, starting]);

  useEffect(() => {
    dispatch(setActive(starting));
    localStorage.setItem("active", starting.toString());
    console.log(starting);
  }, [dispatch, starting]);

  console.log("inimi active nda", localStorage.getItem("active"));

  useEffect(() => {
    if (stage === 0) {
      setPomodoro(parseInt(localStorage.getItem("minutes") || "0", 10));
    }
  }, [stage]);

  const getTimerTime = () => {
    const timeStage: { [key: number]: number } = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };

    localStorage.setItem("minutes", timeStage[stage].toString());
    const minutesInteger = parseInt(localStorage.getItem("minutes") || "0", 10);
    return minutesInteger;
  };

  const UpdateMinute = () => {
    const updateStage: {
      [key: number]: React.Dispatch<React.SetStateAction<number>>;
    } = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };

    localStorage.setItem("updateMinutes", updateStage[stage].toString());
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
      setMinutes((minute) => {
        localStorage.setItem("minutes", (minute - 1).toString());
        return minute - 1;
      });

      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }

    localStorage.setItem("active", starting.toString());
    dispatch(setActive(starting));
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

  console.log("di container", localStorage.getItem("active"));

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
  );
}
