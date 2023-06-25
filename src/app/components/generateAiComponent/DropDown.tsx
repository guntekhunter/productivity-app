"use client";
import Image from "next/image";
import React, { useState } from "react";

// @ts-ignore
export default function DropDown({arrayDrop,callbackDrop,isStatus,placeHolder,
}) {
  const [selected, setSelected] = useState("");
  const [input, setInput] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const hanldeDropDown = () => {
    setIsDrop(!isDrop);
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setSelected(input);
      callbackDrop(input, isStatus);
      setSelected(input);
      setIsSelected(true);
      setIsDrop(false);
    }
    if (e.key === "Space") {
      e.preventDefault();
      setIsOpen(true);
      setSelected(input);
      setIsSelected(true);
      setIsDrop(true);
    }
  };

  return (
    <div className="w-full relative space-y-[.4rem]">
      <button
        onClick={hanldeDropDown}
        className="w-full border-[1.5px] rounded-md flex px-[1rem] py-[1rem] space-x-[.7rem]"
      >
        <Image
          alt="turtles"
          src="/down.png"
          width={500}
          height={0}
          className={`w-[1.5rem] transform duration-100 ${
            isDrop ? "rotate-180" : ""
          }`}
        ></Image>
        <p className={`${isSelected ? "" : "text-gray-400"}`}>
          {isSelected ? selected : `Contoh : ${placeHolder}`}
        </p>
      </button>
      <div
        className={`transfrom duration-100 ease-in z-10 ${
          isDrop ? "" : "opacity-0 hidden"
        } absolute bg-white border-[1.5px] rounded-md w-full right-0 ${isStatus === "difficulty" ? "h-[7rem]":"h-[9rem]"} overflow-y-scroll border-t-[1px] scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black focus:ring-0 focus:outline-none`}
      >
        <div className="">
          {
            isStatus !== "difficulty" && (
              <input
                autoFocus
                className="w-full outline-none py-[.5rem] px-[1rem] border-b-[1.5px]"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            ) 
          }
          {arrayDrop.map((item: string, key: number, seleced: string) => (
            <div
              key={key}
              onClick={(e) => {
                callbackDrop(item, isStatus);
                setSelected(item);
                setIsSelected(true);
                setIsDrop(false);
              }}
              className={`${
                key === arrayDrop.length - 1 ? "" : "border-b-[1.5px]"
              } py-[.5rem] px-[1rem] cursor-pointer trasnform duration-200 hover:bg-black hover:text-white w-full`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function setIsOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
