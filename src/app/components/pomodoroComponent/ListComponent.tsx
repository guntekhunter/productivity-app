"use client";
import React, { useState } from "react";
import Image from "next/image";

// @ts-ignore
export default function ListComponent({ name, key }) {
  const [check, setCheck] = useState(false);
  const checked = () => {
    setCheck(!check);
  };
  console.log(key);
  return (
    <div className="px-[3rem] py-[1.5rem] bg-red-200 rounded-md relative flex justify-between">
      <div className="absolute bg-black w-2 left-0 h-full top-0"></div>
      <p className="font-bold">{name}</p>
      <button onClick={checked}>
        <Image
          alt="turtles"
          src="/checklist.png"
          width={500}
          height={0}
          className={`${check ? "" : "opacity-10"} w-[1.5rem]`}
        />
      </button>
    </div>
  );
}
