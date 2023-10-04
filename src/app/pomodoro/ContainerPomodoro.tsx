"use client";
import React, { Suspense, useEffect, useState } from "react";
import Timer from "../components/pomodoroComponent/Timer";
import List from "../components/pomodoroComponent/List";
import Description from "../components/pomodoroComponent/Description";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ContainerPomodoro() {
  let isLoadings: any;
  let theNames: any;
  if (typeof window !== "undefined") {
    isLoadings = localStorage.getItem("loading");
    theNames = localStorage.getItem("timerName");
  }
  const theLoading = isLoadings;
  const theName = theNames;
  const [isLoading, setIsLoading] = useState(theLoading);
  const route = useRouter();
  const [timerType, setTimerType] = useState(theName);
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
      let theRedirects: any;
      if (typeof window !== "undefined") {
        if (typeof window !== "undefined") {
          theRedirects = localStorage.getItem("redirectPage");
        }
      }
      const thePages = theRedirects;
      route.push(`${thePages}`);
    }
  }, [session, route]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        isLoading === "true" &&
        localStorage.getItem("redirectPage") === "pomodoro"
      ) {
        localStorage.setItem("loading", "false");
        setIsLoading("false");
      }
    }
  }, [isLoading]);
  return (
    <div>
      {theLoading === "false" ? (
        <div className="dark:bg-black">
          <Timer callback={callbackButton} />
          <List color={timerType} />
          <Description />
        </div>
      ) : (
        <div className="h-[100vh] justify-around flex items-center ">
          Loading...
        </div>
      )}
    </div>
  );
}
