"use client";
import React, { Suspense, useEffect, useState } from "react";
import Timer from "../components/pomodoroComponent/Timer";
import List from "../components/pomodoroComponent/List";
import Description from "../components/pomodoroComponent/Description";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ContainerPomodoro() {
  const [isLoading, setIsLoading] = useState(sessionStorage.getItem("loading"));
  const route = useRouter();
  const loading = sessionStorage.getItem("loading");
  const [timerType, setTimerType] = useState(
    sessionStorage.getItem("timerName")
  );
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
      const thePages = sessionStorage.getItem("redirectPage");
      route.push(`${thePages}`);
    }
  }, [session, route]);

  useEffect(() => {
    if (
      isLoading === "true" &&
      sessionStorage.getItem("redirectPage") === "pomodoro"
    ) {
      sessionStorage.setItem("loading", "false");
      setIsLoading("false");
    }
  }, [isLoading]);
  return (
    <div>
      {loading === "false" ? (
        <div>
          <Timer callback={callbackButton} />
          <List color={timerType} />
          <Description />
        </div>
      ) : (
        <div className="h-[100vh] justify-around flex items-center">
          Loading...
        </div>
      )}
    </div>
  );
}
