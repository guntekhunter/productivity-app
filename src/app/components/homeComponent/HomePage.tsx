"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  let theLoading;
  if (typeof window !== "undefined") {
    theLoading = localStorage.getItem("loading");
  } else {
    console.log("you are on the server");
  }
  const [isLoading, setIsLoading] = useState(theLoading);
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
    if (typeof window !== "undefined") {
      localStorage.setItem("redirectPage", e);
      localStorage.setItem("loading", "true");
    } else {
      console.log("You are on the server");
    }
    signIn();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isLoading === "true" && localStorage.getItem("redirectPage") === "") {
        localStorage.setItem("loading", "false");
        setIsLoading("false");
      }
    } else {
      console.log("You are on the server");
    }
  }, [isLoading]);

  useEffect(() => {
    if (path === "") {
      if (typeof window !== "undefined") {
        localStorage.setItem("loading", "false");
      }
    } else {
      console.log("You are on the server");
    }
  }, [path]);

  console.log("ini status loadingnya", session);

  return (
    <>
      {!session ? (
        <div>
          <section className="w-full justify-center flex">
            <div className="md:w-[70%] py-[3rem] w-[90%]">
              <div className="flex justify-center text-center md:text-[2.5rem]">
                Selamat datang di Sebuah Teman.site. Kami Berkomitmen Untuk
                Membantu Teman-Teman Mengatasi Setiap Tugas, Hambatan, Atau
                Proyek Yang Menantang
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex bg-black text-white space-x-[2rem] py-[3rem]">
            <div className="w-[70%] md:flex">
              <div className="flex flex items-center justify-center md:w-[50%] md:hidden flex">
                <div>
                  <Image
                    alt="turtles"
                    src="https://res.cloudinary.com/unm/image/upload/v1688907047/1_idb1hd.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center leading-10">
                  Tingkatkan Fokus Dengan Teknik Pomodoro
                </div>
                <div className="flex md:text-[1rem] items-center">
                  <p>
                    Teknik belajar yang membangi waktu fokus selama 25 menit,
                    istirahat singkat 5 menit dan istirahat panjang 15 menit,
                    terbukti membantu fokus dan pemahaman saat belajar.{" "}
                  </p>
                </div>
                <div className="flex md:py-[.5rem] py-[.7rem] justify-center md:justify-start">
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
                    src="https://res.cloudinary.com/unm/image/upload/v1688907047/1_idb1hd.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex space-x-[2rem] md:py-[6rem] py-[3rem]">
            <div className="w-[80%] md:flex md:px-[4rem] md:py-[3rem] p-[2rem] md:p-0 shadow-md md:shadow-none">
              <div className="flex flex items-center justify-center md:w-[50%] md:hidden">
                <div>
                  <Image
                    alt="turtles"
                    src="https://res.cloudinary.com/unm/image/upload/v1688906974/2_ytis6z.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-1 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] items-center text-[1.5rem] leading-10">
                  Kalimatmu Kepanjangnya?
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Meringkas kalimat panjang dengan cepat dan sesuai kebutuhanmu.
                </div>
                <div className="flex md:py-[.5rem] justify-center md:justify-start">
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
                    src="https://res.cloudinary.com/unm/image/upload/v1688906974/2_ytis6z.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full shadow-md"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex space-x-[2rem] pb-[3rem] md:pb-[6rem]">
            <div className="w-[80%] md:flex  md:px-[4rem] md:py-[3rem] p-[2rem] md:p-0 shadow-md md:shadow-none">
              <div className="flex flex items-center justify-center md:w-[50%] md:pr-[2.5rem]">
                <div className="">
                  <Image
                    alt="turtles"
                    src="https://res.cloudinary.com/unm/image/upload/v1688906973/3_a1p68x.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-[.3rem] space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center leading-10">
                  Paraphrase Kalimatmu Untuk Menghindari Plagiarisme
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Mengubah kalimat agar tidak terjadi plagiarisme dengan
                  mengatur tingkat perbedaan kata yang dapat disesuaikan.
                </div>
                <div className="flex md:py-[.5rem] py-[.7rem] justify-center md:justify-start">
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
          <section className="w-full justify-center flex space-x-[2rem] pb-[3rem] md:pb-[6rem]">
            <div className="w-[80%] md:flex md:px-[4rem] md:py-[3rem] p-[2rem] md:p-0 shadow-md md:shadow-none">
              <div className="flex flex items-center justify-center md:w-[50%] md:hidden">
                <div>
                  <Image
                    alt="turtles"
                    src="https://res.cloudinary.com/unm/image/upload/v1688906973/4_zvqjaj.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center leading-10">
                  Mencari Ide Menjadi Lebih Mudah
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Menyediakan saran berdasarkan kategori, tujuan ide, dan
                  tingkat kesulitan dalam mengimplementasikan ide teman-teman.
                </div>
                <div className="flex py-[.7rem] md:py-[.5rem] py-[.7rem] justify-center md:justify-start bg-re-200">
                  <button
                    className="bg-black text-white py-[.2rem] px-[2rem] rounded-md"
                    onClick={() => tryFitures("idekan")}
                  >
                    Coba
                  </button>
                </div>
              </div>
              <div className="flex flex items-center justify-center md:w-[50%] md:flex hidden md:ml-[2rem]">
                <div>
                  <Image
                    alt="turtles"
                    src="https://res.cloudinary.com/unm/image/upload/v1688906973/4_zvqjaj.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full shadow-md"
                  ></Image>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full justify-center flex space-x-[2rem] pb-[3rem]">
            <div className="w-[80%] md:flex  md:px-[4rem] md:py-[3rem] p-[2rem] md:p-0 shadow-md md:shadow-none">
              <div className="flex flex items-center justify-center md:w-[50%] md:mr-[2.5rem]">
                <div>
                  <Image
                    alt="turtles"
                    src="https://res.cloudinary.com/unm/image/upload/v1688906973/5_rkemby.jpg"
                    width={500}
                    height={200}
                    className="md:h-full md:w-full shadow-md"
                  ></Image>
                </div>
              </div>
              <div className="md:w-[50%] py-[3rem] md:space-y-0 space-y-[1rem]">
                <div className="flex md:text-[2.5rem] text-[1.5rem] items-center leading-10">
                  Memberikan solusi dari masalah anda dengan AI
                </div>
                <div className="flex md:text-[1rem] items-center">
                  Kami peduli dengan teman-teman dan siap mendengarkan dengan
                  penuh perhatian. Bersama-sama, kita akan menemukan solusi yang
                  sesuai dan membantumu mengatasi tantangan yang sedang kamu
                  hadapi.
                </div>
                <div className="flex md:py-[.5rem] py-[.7rem] justify-center md:justify-start">
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
                Tugas Dan Masalah Teman-teman terasa berat?, membutuhnya
                Bantukan?, silahkan login dibawah
              </div>
              <div className="flex justify-center  py-[2rem]">
                <button
                  className="bg-black text-white py-[.2rem] px-[2rem] rounded-md"
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
