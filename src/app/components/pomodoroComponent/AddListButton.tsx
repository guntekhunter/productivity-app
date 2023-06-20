"use client";
import Image from "next/image";
import React, { useState } from "react";

// @ts-ignore
export default function AddListButton({ callback }) {
  const [isActive, setIsActive] = useState(false);
  const [listName, setListName] = useState("");

  const addList = () => {
    setIsActive(!isActive);
  };

  const saveList = () => {
    const newList = listName;
    callback(newList);
    setIsActive(false);
  };
  return (
    <div>
      {isActive ? (
        <div className="px-[2.5rem] py-[1.5rem] rounded-md relative flex border-[.2rem] border-black w-full">
          <div className="space-y-2 w-full">
            <p className="text-[1.5rem] font-bold">Tambah List</p>
            <input
              type="text"
              autoFocus
              placeholder="Apa yang ingin kamu selesaikan?"
              onChange={(e) => setListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents the default Enter key behavior (e.g., form submission)
                  saveList();
                }
              }}
              className="w-full appearance-none focus:ring-0 focus:outline-none focus:border-none"
            />
            <div className="my-2 flex justify-end w-full pt-[1rem] space-x-[2rem]">
              <button
                onClick={addList}
                className="bg-gray-200 text-black hover:bg-gray-300 px-[3rem] py-[.5rem] rounded-md font-light"
              >
                Batal
              </button>
              <button
                onClick={saveList}
                className="bg-black text-white px-[3rem] hover:bg-gray-900 py-[.5rem] rounded-md font-light"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={addList}
          className="px-[3rem] py-[1.5rem] rounded-md relative flex justify-around border-[.2rem] border-black border-dashed w-full"
        >
          <div className="flex space-x-2 font-bold">
            <Image
              src="/checklist.png"
              alt=""
              width={500}
              height={0}
              className="w-[1.5rem]"
            ></Image>
            <p>Tambah List</p>
          </div>
        </button>
      )}
    </div>
  );
}
