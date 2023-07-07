"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

// @ts-ignore
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  // const [userExist, setUserExist] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { data: session } = useSession();

  const login = async () => {
    Cookies.set("loggedin", "true");
    Cookies.set("redirectPage", "pomodoro");
    Cookies.set("loading", "true");
    signIn();
  };

  const logout = () => {
    Cookies.remove("loggedin");
    Cookies.set("loading", "true");
    signOut();
  };

  const activateNav = () => {
    setIsActive(!isActive);
  };

  if (session) {
    return (
      <div className="fixed w-full flex justify-around relative z-20">
        <div className="md:w-[70%] w-[90%] flex justify-between border-b-2 h-full md:py-[1.3rem] py-[.5rem] sticky top-0">
          <div className="font-bold">Teman</div>
          <div className="md:flex hidden sm:hidden">
            <ul className="flex space-x-[3rem] text-[.8rem]">
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
              <Link href="">
                <button onClick={logout} className="">
                  LogOut
                </button>
              </Link>
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
        <div className="md:w-[70%] w-[90%] flex justify-between border-b-2 h-full py-[1.3rem] sticky top-0">
          <div className="font-bold">Teman</div>
          <div>
            <ul className="space-x-[3rem] text-[.8rem] md:flex hidden sm:hidden">
              <Link
                href="/"
                className={`hover:font-bold ${
                  pathname === "/" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
              <button
                onClick={login}
                className="bg-black text-white py-[.1rem] px-[1rem] rounded-md hover:bg-gray-900 duration-200"
              >
                Login
              </button>
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

          {/* mobile nav */}
          <div
            className={`absolute md:hidden bg-black text-white py-[1.6rem] px-[2rem] space-y-[1rem] left-0 transform duration-500 transition-opacity ${
              isActive ? "" : "hidden"
            }`}
          >
            <div>
              <Link
                onClick={activateNav}
                href="/"
                className={`hover:font-bold flex justify-center ${
                  pathname === "/" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
            </div>
            <button
              onClick={login}
              className="bg-white text-black rounded-md py-[.1rem] px-[1rem]"
            >
              LogIn
            </button>
          </div>
        </div>
      </div>
    );
  }
}
