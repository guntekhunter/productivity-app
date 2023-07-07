import React from "react";

export default function LoadingList() {
  return (
    <div className="space-y-[1rem]">
      <div className="bg-white shadow-md w-full h-[4rem] rounded-md flex items-center px-[2rem] justify-between">
        <div className="w-[6rem] h-[1rem] bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex space-x-[1rem]">
          <div className="w-[2rem] h-[2rem] bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-[2rem] h-[2rem] bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
