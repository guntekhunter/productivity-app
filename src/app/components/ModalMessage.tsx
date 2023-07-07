"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { useSession } from "next-auth/react";

export default function ModalMessage() {
  const { data: session } = useSession();

  const isActive = useSelector((state: RootState) => state.navbar.value);

  return (
    <div
      className={`w-full fixed top-0 z-20  md:mt-[1rem] flex transform duration-500 ease-in ${
        isActive ? "mt-[4rem] opacity-1" : "mt-[1rem] opacity-0 hidden"
      }`}
    >
      <div className="bg-black text-white px-4 py-2 rounded-md ml-[1.3rem] w-[80%] md:w-[20rem] md:ml-[12rem]">
        <p className="break-words">
          Terimakasih masukannya {session?.user?.name} 😊
        </p>
      </div>
    </div>
  );
}
