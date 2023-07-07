"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(Cookies.get("loading"));
  const [userExist, setUserExist] = useState(false);
  const { data: session } = useSession();
  const route = useRouter();
  const path = usePathname();

  useEffect(() => {
    const addUser = async () => {
      if (session) {
        try {
          if (!userExist) {
            const data = await axios.post("/api/user", {
              name: session?.user?.name,
              email: session?.user?.email,
              image: session?.user?.image,
            });
            if (data.data.response === "user exist") {
              setUserExist(true);
              return;
            }
          }
        } catch (error) {
          console.error("Error adding user:", error);
        }
      }
    };
    addUser();
  }, [session, userExist]);

  useEffect(() => {
    if (session) {
      route.push("/pomodoro");
    }
  }, [session, route]);

  const tryFitures = (e: string) => {
    Cookies.set("loggedin", "true");
    Cookies.set("redirectPage", e);
    Cookies.set("loading", "true");
    signIn();
  };

  useEffect(() => {
    if (isLoading === "true" && Cookies.get("redirectPage") === "") {
      Cookies.set("loading", "false");
      setIsLoading("false");
    }
  }, [isLoading]);

  console.log(Cookies.get("redirectPage"));

  useEffect(() => {
    if (path === "") {
      Cookies.set("loading", "false");
    }
  }, [path]);

  return (
    <>
      {isLoading === "false" ? (
        <div>
          <section className="w-full justify-center flex">
            <div className="md:w-[70%] py-[3rem] w-[90%]">
              <div className="flex justify-center text-center md:text-[2.5rem]">
                Selamat datang di Teman.Com. Kami Berkomitmen Untuk Membantu
                Teman-Teman Mengatasi Setiap Tugas, Hambatan, Atau Proyek Yang
                Menantang
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex bg-black text-white space-x-[2rem] py-[3rem]">
            <div className="w-[80%] md:flex">
              <div className="flex flex items-center justify-center md:w-[50%] md:hidden flex">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/1.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem]"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center">
                  Tingkatkan Fokus Dengan Teknik Pomodoro
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Teknik belajar yang membangi waktu fokus selama 25 menit,
                  istirahat singkat 5 menit dan istirahat panjang 15 menit,
                  terbukti membantu fokus dan pemahaman saat belajar
                </div>
                <div className="flex md:py-[2rem] py-[.7rem] justify-center md:justify-start">
                  <button
                    className="bg-white text-black py-[.2rem] px-[2rem] rounded-md"
                    onClick={() => tryFitures("pomodoro")}
                  >
                    Coba
                  </button>
                </div>
              </div>
              <div className="flex flex items-center justify-center md:w-[50%] md:flex hidden">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/1.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem]"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex space-x-[2rem] py-[3rem]">
            <div className="w-[80%] md:flex">
              <div className="flex flex items-center justify-center md:w-[50%] md:hidden">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/2.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem] shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] items-center text-[1.5rem]">
                  Ringkas Kalimat Dengan Mudah
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Meringkas kalimat panjang dengan cepat dan sesuai kebutuhanmu.
                </div>
                <div className="flex md:py-[2rem] py-[.7rem] justify-center md:justify-start">
                  <button
                    className="bg-black text-white py-[.2rem] px-[2rem] rounded-md"
                    onClick={() => tryFitures("peringkas")}
                  >
                    Coba
                  </button>
                </div>
              </div>
              <div className="flex flex items-center justify-center md:w-[50%] md:flex hidden">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/2.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem] shadow-md"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex space-x-[2rem] pb-[3rem]">
            <div className="w-[80%] md:flex">
              <div className="flex flex items-center justify-center md:w-[50%]">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/3.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem] shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center">
                  Paraphrase Kalimat Untuk Menghindari Plagiarisme
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Mengubah kalimat agar tidak terjadi plagiarisme dengan
                  mengatur tingkat perbedaan kata yang dapat disesuaikan.
                </div>
                <div className="flex py-[2rem] py-[.7rem] justify-center md:justify-start">
                  <button
                    className="bg-black text-white py-[.2rem] px-[2rem] rounded-md"
                    onClick={() => tryFitures("paraphrase")}
                  >
                    Coba
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex space-x-[2rem] pb-[3rem]">
            <div className="w-[80%] md:flex">
              <div className="flex flex items-center justify-center md:w-[50%] md:hidden">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/4.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem] shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center">
                  Mencari Ide Menjadi Lebih Mudah
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Menyediakan saran berdasarkan kategori, tujuan ide, dan
                  tingkat kesulitan dalam mengimplementasikan ide teman-teman.
                </div>
                <div className="flex py-[2rem] md:py-[2rem] py-[.7rem] justify-center md:justify-start">
                  <button
                    className="bg-black text-white py-[.2rem] px-[2rem] rounded-md"
                    onClick={() => tryFitures("idekan")}
                  >
                    Coba
                  </button>
                </div>
              </div>
              <div className="flex flex items-center justify-center md:w-[50%] md:flex hidden">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/4.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem] shadow-md"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex space-x-[2rem] pb-[3rem]">
            <div className="w-[80%] md:flex">
              <div className="flex flex items-center justify-center md:w-[50%]">
                <div>
                  <Image
                    alt="turtles"
                    src="/fitures/5.jpg"
                    width={500}
                    height={200}
                    className="md:h-[14rem] md:w-[24rem] shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center">
                  Memberikan solusi dari masalah anda dengan AI
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Kami peduli dengan teman-teman dan siap mendengarkan dengan
                  penuh perhatian. Bersama-sama, kita akan menemukan solusi yang
                  sesuai dan membantumu mengatasi tantangan yang sedang kamu
                  hadapi.
                </div>
                <div className="flex md:py-[2rem] py-[.7rem] justify-center md:justify-start">
                  <button
                    className="bg-black text-white py-[.2rem] px-[2rem] rounded-md"
                    onClick={() => tryFitures("konsultan")}
                  >
                    Coba
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex">
            <div className="md:w-[70%] py-[3rem] w-[90%]">
              <div className="flex justify-center text-center md:text-[2.5rem]">
                Sekian Perkenalan Kami, Jika Teman-teman Butuhkan Bantuan Dengan
                Tugas Dan Masalah Teman-teman Silahkan Login Ke Teman.com
              </div>
              <div className="flex justify-center  py-[2rem]">
                <button
                  className="bg-black text-white px-[2rem] py-[.5rem] rounded-md"
                  onClick={() => tryFitures("pomodoro")}
                >
                  Login
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="h-[100vh] justify-around flex items-center">
          Loading...
        </div>
      )}
    </>
  );
}
