"use client";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useDispatch } from "react-redux";
import { navbarActive } from "../GlobalRedux/features/navbar/navbarActiveSlice";

export default function Footer() {
  const [value, setValue] = useState("");
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();

  const [state, handleSubmit] = useForm("mvojpyga");

  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const { data: session } = useSession();

  const login = () => {
    Cookies.set("loggedin", "true");
    signIn();
  };

  const activateNav = () => {
    setIsActive(!isActive);
  };

  const sendMessage = () => {
    dispatch(navbarActive(true));
    setTimeout(() => {
      dispatch(navbarActive(false));
    }, 3000);
  };

  return (
    <section className="w-full bg-black text-white flex justify-around relative">
      <div className="md:w-[70%] w-[90%] pt-[5rem] pb-[1rem] md:space-y-[5rem]">
        <div className="md:flex justify-between px-[1rem]">
          <div className="flex space-x-[4rem]">
            <p className="text-[1.8rem]">Teman</p>
            <div className="pt-[1rem]">
              {session ? (
                <div className="space-y-[1rem]">
                  <div>
                    <Link
                      onClick={activateNav}
                      href="/pomodoro"
                      className={`transform duration-100 hover:pl-[.3rem] ${
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
                      className={`transform duration-100 hover:pl-[.3rem] ${
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
                      className={`transform duration-100 hover:pl-[.3rem] ${
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
                      className={`transform duration-100 hover:pl-[.3rem] ${
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
                      className={`transform duration-100 hover:pl-[.3rem] ${
                        pathname === "/konsultan" ? "font-bold" : ""
                      }`}
                    >
                      Konsultan
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <button
                      onClick={login}
                      className={`transform duration-100 hover:bg-gray-200 bg-white text-black px-2 rounded-md text-[.8rem] font-bold`}
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* feedback */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-[1rem] md:my-0 my-[2rem] ${
              session ? "" : "hidden"
            }`}
          >
            <p className="text-white">
              Apa yang perlu kami tambahkan untuk kenyamanan teman-teman 😊
            </p>
            <input
              type="text"
              className="hidden"
              name="user_name"
              value={session?.user?.name !== null ? session?.user?.name : ""}
            />
            <input
              type="text"
              className="hidden"
              name="user_name"
              value={session?.user?.email !== null ? session?.user?.email : ""}
            />
            <input type="text" className="hidden" name="user_email" />
            <textarea
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="w-full text-black px-2 rounded-md"
              placeholder="ketik pesan"
              name="message"
            />
            <button
              className="bg-white text-black px-3 py-1 rounded-md font-bold"
              onClick={sendMessage}
            >
              Kirim
            </button>
          </form>
        </div>

        <div className="flex justify-between text-[.8rem] md:my-0 my-[3rem]">
          <div>
            <p>Copyright © 2023</p>
          </div>
          <div>
            <p>
              Powered by{" "}
              <Link
                href="https://openai.com/"
                target="_blank"
                className="hover:border-b-[1px]"
              >
                OpenAi
              </Link>
            </p>
          </div>
          <div>
            <p>
              Website by{" "}
              <Link
                href="https://portfolio-neon-three-38.vercel.app/"
                target="_blank"
                className="hover:border-b-[1px] transition-all ease-in duration-200"
              >
                Guntek
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
