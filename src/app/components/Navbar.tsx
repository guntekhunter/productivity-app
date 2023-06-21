import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-around">
      <div className="w-[80%] flex justify-between border-b-2 h-full py-[1.3rem] sticky top-0">
        <div className="font-bold">Teman Kerja</div>
        <div>
          <ul className="flex space-x-[3rem] font-bold text-[.8rem]">
            <Link href="/">Home</Link>
            <Link href="/pomodoro">Pomodoro</Link>
            <Link href="/peringkas">Peringkas</Link>
            <li>Paraphrase</li>
            <li>Idea Generator</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
