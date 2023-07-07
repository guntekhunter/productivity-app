"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

// @ts-ignore
export default function ListComponent({name,color,callback,index,deleted,id,
}) {
  const [check, setCheck] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const checked = () => {
    setCheck(!check);
    const status = check;
  };

  const createDeletingHandler = (idList: number, index: number) => {
    return async () => {
      deleted(index, idList);
      try {
        const res = await axios.post(
          "/api/delete",
          {
            id: idList,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
  };

  const deleting = createDeletingHandler(id, index);

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


  const editList = async (event: { key: string }) => {
    console.log("ini idnya yang diedit", id);
    console.log("ini indexnya yang diedit", index);
    if (event.key === "Enter") {
      callback(editedName, index);
      setIsEdit(!isEdit);
      try {
        const response = await axios.post("/api/edit", {
          id: id,
          listName: editedName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className={`transition duration-200 ease-in-out ${
        color === "pomodoro"
          ? "bg-red-200"
          : color === "short-break"
          ? "bg-green-200"
          : "bg-blue-200"
      } md:px-[3rem] px-[2rem] py-[1.5rem] rounded-md relative flex justify-between h-auto inline-block`}
    >
      <div className="absolute bg-black w-2 left-0 h-full top-0"></div>
      {isEdit ? (
        <input
          type="text"
          value={editedName}
          onChange={handleInputChange}
          onKeyDown={editList}
          className={`w-full md:text-[1rem] text-[.8rem] appearance-none focus:ring-0 focus:outline-none focus:border-none transition duration-200 ease-in-out font-bold ${
            color === "pomodoro"
              ? "bg-red-200"
              : color === "short-break"
              ? "bg-green-200"
              : "bg-blue-200"
          }`}
        />
      ) : (
        <p
          className="font-bold md:w-[80%] w-[76%] break-words md:text-[1rem] text-[.8rem]"
          onClick={handleDoubleClick}
        >
          {name}
        </p>
      )}
      <div className="flex space-x-3">
        <button onClick={deleting}>
          <Image
            alt="turtles"
            src="/delete.png"
            width={500}
            height={500}
            className={`w-[1.5rem]`}
          />
        </button>
        <button onClick={checked}>
          <Image
            alt="turtles"
            src="/checklist.png"
            width={500}
            height={500}
            className={`${check ? "" : "opacity-10"} w-[1.6rem]`}
          />
        </button>
      </div>
    </div>
  );
}
