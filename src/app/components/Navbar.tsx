"use client";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// @ts-ignore
export default function Navbar() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const { data: session } = useSession();

  const login = () => {
    Cookies.set("loggedin", "true");
    signIn();
  };

  const logout = () => {
    Cookies.remove("loggedin");
    signOut();
  };

  const activateNav = () => {
    setIsActive(!isActive);
  };

  console.log(isActive);

  if (session) {
    return (
      <div className="fixed w-full flex justify-around relative">
        <div className="w-[70%] flex justify-between border-b-2 h-full md:py-[1.3rem] py-[.5rem] sticky top-0">
          <div className="font-bold">Teman</div>
          <div className="md:flex hidden sm:hidden">
            <ul className="flex space-x-[3rem] text-[.8rem]">
              <Link
                href="/"
                className={`hover:font-bold ${
                  pathname === "" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/pomodoro"
                className={`hover:font-bold ${
                  pathname === "/pomodoro" ? "font-bold" : ""
                }`}
              >
                Pomodoro
              </Link>
              <Link
                href="/peringkas"
                className={`hover:font-bold ${
                  pathname === "/peringkas" ? "font-bold" : ""
                }`}
              >
                Peringkas
              </Link>
              <Link
                href="/paraphrase"
                className={`hover:font-bold ${
                  pathname === "/paraphrase" ? "font-bold" : ""
                }`}
              >
                Paraphrase
              </Link>
              <Link
                href="/idekan"
                className={`hover:font-bold ${
                  pathname === "/idekan" ? "font-bold" : ""
                }`}
              >
                Idea Generator
              </Link>
              <Link
                href="/konsultan"
                className={`hover:font-bold ${
                  pathname === "/konsultan" ? "font-bold" : ""
                }`}
              >
                Konsultan
              </Link>
              <button onClick={logout}>LogOut</button>
            </ul>
          </div>
          <div
            className="flex justify-center items-center md:hidden"
            onClick={activateNav}
          >
            <Image
              src="/more.png"
              alt=""
              width={500}
              height={500}
              className="w-[1rem] h-[1rem]"
            />
          </div>
        </div>
        {/* mobile navbar */}
        <div
          className={`absolute md:hidden bg-black text-white py-[1.6rem] px-[2rem] space-y-[1rem] left-0 transform duration-500 transition-opacity ${
            isActive ? "" : "hidden"
          }`}
        >
          <div>
            <Link
              onClick={activateNav}
              href="/"
              className={`hover:font-bold ${
                pathname === "" ? "font-bold" : ""
              }`}
            >
              Home
            </Link>
          </div>
          <div>
            <Link
              onClick={activateNav}
              href="/pomodoro"
              className={`hover:font-bold ${
                pathname === "/pomodoro" ? "font-bold" : ""
              }`}
            >
              Pomodoro
            </Link>
          </div>
          <div>
            <Link
              onClick={activateNav}
              href="/peringkas"
              className={`hover:font-bold ${
                pathname === "/peringkas" ? "font-bold" : ""
              }`}
            >
              Peringkas
            </Link>
          </div>
          <div>
            <Link
              onClick={activateNav}
              href="/paraphrase"
              className={`hover:font-bold ${
                pathname === "/paraphrase" ? "font-bold" : ""
              }`}
            >
              Paraphrase
            </Link>
          </div>
          <div>
            <Link
              onClick={activateNav}
              href="/idekan"
              className={`hover:font-bold ${
                pathname === "/idekan" ? "font-bold" : ""
              }`}
            >
              Idea Generator
            </Link>
          </div>
          <div>
            <Link
              onClick={activateNav}
              href="/konsultan"
              className={`hover:font-bold ${
                pathname === "/konsultan" ? "font-bold" : ""
              }`}
            >
              Konsultan
            </Link>
          </div>
          <button onClick={logout}>LogOut</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-around">
        <div className="w-[70%] flex justify-between border-b-2 h-full py-[1.3rem] sticky top-0">
          <div className="font-bold">Teman</div>
          <div>
            <ul className="flex space-x-[3rem] text-[.8rem]">
              <Link
                href="/"
                className={`hover:font-bold ${
                  pathname === "" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
              <button onClick={login}>Login</button>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
