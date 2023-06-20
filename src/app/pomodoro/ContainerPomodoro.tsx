"use client";
import React, { useState } from "react";
import Timer from "../components/pomodoroComponent/Timer";
import List from "../components/pomodoroComponent/List";

export default function ContainerPomodoro() {
  const [timerType, setTimerType] = useState("pomodoro");
  const callbackButton = async (value: string) => {
    setTimerType(value);
  };
  return (
    <div>
      <Timer callback={callbackButton} />
      <List color={timerType} />
    </div>
  );
}
