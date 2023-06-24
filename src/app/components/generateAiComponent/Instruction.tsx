import React from "react";

// @ts-ignore
export default function Instruction({ number, instructions, suggestions }) {
  return (
    <div className="py-2 flex space-x-2">
      <div className="bg-black text-white w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center font-bold">
        <p className="text-center">{number}</p>
      </div>
      <div className="flex items-center justify-center font-bold">
        <p>
          {instructions}{" "}
          <span className={`text-gray-400 ${suggestions ? "" : "hidden"}`}>
            ({suggestions})
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
