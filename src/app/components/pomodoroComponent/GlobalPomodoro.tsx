"use client";
import React, { useEffect, useState } from "react";
import { formatTime } from "./TimerFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useSession } from "next-auth/react";
import addNotification from "react-push-notification";

const cycleTimes = [5, 25]; // Cycle times in minutes
const cycleCountLimit = 4;

export default function GlobalPomodoro() {
  const globalTimeActive = useSelector(
    (state: RootState) => state.timeActive.value
  );

  
  // need to set the count to global variable to

  return (
    <div
      className={`position absolute right-[2rem] transition duration-500 ease-in-out top-[-3rem]  h-full hover:top-0 transition-all
        // session ? "" : "hidden"
      `}
    >
      <div
        className={`absolute sticky top-0 top-[-2rem] px-[2rem] py-[.5rem] rounded-md mt-3
         `}
      >
        Istirahat
      </div>
    </div>
  );
}
