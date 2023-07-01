"use client";
import React, { useEffect, useState } from "react";

//@ts-ignore
export default function Timer({ stage, switchStage, getTimerTime, seconds, starting,setStarting }) {
  const options = ["Pomodoro", "Short-Break", "Long-break"];
  
  return (
    <div className="">
      <div className="w-full flex justify-around pt-[2rem]">
        <div
          className={`transition duration-200 ease-in-out bg-red-200 w-[60%] p-[2rem] rounded-md`}
        >
          <div className="flex justify-around pt-[1.5rem]">
            <div className="flex justify-between w-[60%]">
              {options.map((item, key) => (
                <button
                  key={key}
                  className={`duration-100 ${
                    key === stage
                      ? "bg-black text-white"
                      : "hover:bg-opacity-10 hover:bg-black"
                  }  px-5 py-2 rounded-md`}
                  onClick={() => switchStage(key)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-around">
            <div className="text-[8rem] font-bold">
              {getTimerTime()}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="flex justify-around py-[2rem]">
            {
              starting?(
                <button className="bg-black text-white text-[3rem] font-bold w-[25rem] rounded-md" onClick={()=>setStarting(false)}>
                  PAUSE
                </button>
              ):(
                <button className="bg-black text-white text-[3rem] font-bold w-[25rem] rounded-md" onClick={()=>setStarting(true)}>
                  START
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
