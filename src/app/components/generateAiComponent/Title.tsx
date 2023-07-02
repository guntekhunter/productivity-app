import React from "react";

// @ts-ignore
export default function Title({ title, more }) {
  return (
    <div className="w-full flex justify-around mb:py-[2rem] py-[1rem]">
      <div className="w-[30rem]">
        <p className="text-[3rem] font-bold text-center space-y-2 leading-[3.4rem]">
          {title}
        </p>
        <p className="text-center space-y-2 leading-[1.4rem] text-gray-500 mt-2">
          {more}
        </p>
      </div>
    </div>
  );
}
