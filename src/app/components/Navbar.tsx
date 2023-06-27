"use client";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const login = () => {
    Cookies.set("loggedin", "true");
    console.log(session);
    signIn();
  };

  const logout = () => {
    Cookies.remove("loggedin");
    console.log(session);
    signOut();
  };

  console.log(session);

  if (session) {
    return (
      <div className="w-full flex justify-around">
        <div className="w-[70%] flex justify-between border-b-2 h-full py-[1.3rem] sticky top-0">
          <div className="font-bold">Teman</div>
          <div>
            <ul className="flex space-x-[3rem] text-[.8rem]">
              <Link href="/" className={`hover:font-bold`}>
                Home
              </Link>
              <Link href="/pomodoro" className={`hover:font-bold`}>
                Pomodoro
              </Link>
              <Link href="/peringkas" className={`hover:font-bold`}>
                Peringkas
              </Link>
              <Link href="/paraphrase" className={`hover:font-bold`}>
                Paraphrase
              </Link>
              <Link href="/idekan" className={`hover:font-bold`}>
                Idea Generator
              </Link>
              <button onClick={logout}>LogOut</button>
            </ul>
          </div>
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
              <Link href="/" className={`hover:font-bold`}>
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
