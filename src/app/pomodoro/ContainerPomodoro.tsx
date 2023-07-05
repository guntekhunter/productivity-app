"use client";
import React, { useEffect, useState } from "react";
import Timer from "../components/pomodoroComponent/Timer";
import List from "../components/pomodoroComponent/List";
import Description from "../components/pomodoroComponent/Description";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ContainerPomodoro() {
  const route = useRouter();
  const [timerType, setTimerType] = useState(localStorage.getItem("timerName"));
  const callbackButton = async (value: string) => {
    setTimerType(value);
  };

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (session.status !== "unauthenticated") {
      const thePages = localStorage.getItem("redirectPage");
      route.push(`${thePages}`);
    }
  }, [session, route]);

  console.log(localStorage.getItem("redirectPage"));
  return (
    <div>
      <Timer callback={callbackButton} />
      <List color={timerType} />
      <Description />
    </div>
  );
}
