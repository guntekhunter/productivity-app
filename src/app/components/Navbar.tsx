import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-around">
      <div className="w-[70%] flex justify-between border-b-2 h-full py-[1.3rem] sticky top-0">
        <div className="font-bold">Teman</div>
        <div>
          <ul className="flex space-x-[3rem] text-[.8rem]">
            <Link href="/" className="hover:font-bold">
              Home
            </Link>
            <Link href="/pomodoro" className="hover:font-bold">
              Pomodoro
            </Link>
            <Link href="/peringkas" className="hover:font-bold">
              Peringkas
            </Link>
            <Link href="/paraphrase" className="hover:font-bold">
              Paraphrase
            </Link>
            <li className="hover:font-bold">Idea Generator</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
