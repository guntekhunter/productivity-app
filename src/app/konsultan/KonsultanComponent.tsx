import React from "react";

export default function KonsultanComponent() {
  return (
    <div className="w-full flex justify-around ">
      <div className="w-[70%] py-2">
        <div className="w-full border-[1.5px] h-[30rem] rounded-md flex flex-col">
          <div className="flex-1 px-[2rem] pt-[1.5rem] space-y-[1rem] overflow-y-scroll scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black">
            <div className="w-[30rem] p-[.5rem] rounded-md bg-white shadow-md">
              first
            </div>
            <div className="w-[20rem] p-[.5rem] rounded-md ml-auto bg-black text-white">
              seconds
            </div>
            <div className="w-[30rem] p-[.5rem] rounded-md bg-white shadow-md">
              thirt
            </div>
          </div>
          <div className="h-[5rem] flex flex-rows items-center px-[2rem] py-4 space-x-2 bg-gray-100">
            <div className="flex-1">
              <input
                type="text"
                className="w-full h-[2rem] px-[.5rem]"
                autoFocus
              />
            </div>
            <button className="bg-black text-white rounded-md hover:bg-gray-900 w-[5rem] h-[2rem]">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
