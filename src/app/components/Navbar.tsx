import React from "react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-around">
      <div className="w-[80%] flex justify-between border-b-2 h-full py-[1.3rem] sticky top-0">
        <div className="font-bold">Teman Kerja</div>
        <div>
          <ul className="flex space-x-[3rem] font-bold text-[.8rem]">
            <li>Home</li>
            <li>Pomodoro</li>
            <li>Peringkas</li>
            <li>Paraphrase</li>
            <li>Idea Generator</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
