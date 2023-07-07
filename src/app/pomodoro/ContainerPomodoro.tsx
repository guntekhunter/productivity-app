"use client";
import React, { Suspense, useEffect, useState } from "react";
import Timer from "../components/pomodoroComponent/Timer";
import List from "../components/pomodoroComponent/List";
import Description from "../components/pomodoroComponent/Description";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ContainerPomodoro() {
  const [isLoading, setIsLoading] = useState(Cookies.get("loading"));
  const route = useRouter();
  const loading = Cookies.get("loading");
  const [timerType, setTimerType] = useState(Cookies.get("timerName"));
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
      const thePages = Cookies.get("redirectPage");
      route.push(`${thePages}`);
    }
  }, [session, route]);

  useEffect(() => {
    if (isLoading === "true" && Cookies.get("redirectPage") === "pomodoro") {
      Cookies.set("loading", "false");
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
