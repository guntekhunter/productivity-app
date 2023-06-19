"use client";
import React, { useState } from "react";
import Image from "next/image";

// @ts-ignore
export default function ListComponent({ name, color, callback, index }) {
  const [check, setCheck] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const checked = () => {
    setCheck(!check);
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    setEditedName(e.target.value);
  };

  const handleDoubleClick = (e: any) => {
    const delay = 300;
    let clickCount = e.detail;

    clickCount++;
    setTimeout(() => {
      if (clickCount === 2) {
        setIsEdit(true);
      }
    }, delay);
  };

  const editList = () => {
    callback(editedName, index);
  };

  console.log(index);
  console.log(isEdit);
  console.log(editedName);

  return (
    <div
      className={`transition duration-200 ease-in-out ${
        color === "pomodoro"
          ? "bg-red-200"
          : color === "short-break"
          ? "bg-green-200"
          : "bg-blue-200"
      } px-[3rem] py-[1.5rem] rounded-md relative flex justify-between`}
    >
      <div className="absolute bg-black w-2 left-0 h-full top-0"></div>
      {isEdit ? (
        <input
          type="text"
          value={editedName}
          onChange={handleInputChange}
          onKeyDown={editList}
          className={`w-full appearance-none focus:ring-0 focus:outline-none focus:border-none transition duration-200 ease-in-out font-bold ${
            color === "pomodoro"
              ? "bg-red-200"
              : color === "short-break"
              ? "bg-green-200"
              : "bg-blue-200"
          }`}
        />
      ) : (
        <p className="font-bold w-full" onClick={handleDoubleClick}>
          {name}
        </p>
      )}
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
