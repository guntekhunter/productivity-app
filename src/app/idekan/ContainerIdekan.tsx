"use client";
import React, { useEffect, useState } from "react";
import Instruction from "../components/generateAiComponent/Instruction";
import Image from "next/image";
import DropDown from "../components/generateAiComponent/DropDown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Title from "../components/generateAiComponent/Title";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";

export default function ContainerIdekan() {
  let theLoadings: any;
  if (typeof window !== "undefined") {
    theLoadings = localStorage.getItem("loading");
  }
  const theLoading = theLoadings;
  const [input, setInput] = useState<string>("");
  const [questions, setQuestions] = useState<{ chat: any }[]>([]);
  const [summary, setSummary] = useState("");
  const [hoverClear, setHoverClear] = useState(false);
  const [hoverCopy, setHoverCopy] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputRequired, setInputRequired] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [target, setTarget] = useState("");
  const [isLoadingPage, setIsLoadingPage] = useState(theLoading);

  const startResume = async () => {
    setQuestions([...questions, { chat: input }]);
    setIsLoading(false);
    setSummary("");
    if (!input) {
      setInputRequired(true);
    } else {
      try {
        setIsLoading(true);
        const res = await fetch("/api/paraphrase", {
          method: "POST",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a language model that can generate genereate idea base on user input.`,
              },
              {
                role: "user",
                content: `buat sebuah ide dalam kategori ${category}, target idenya adalah ${target}, idenya tentang ${input}, tingkat kesulitan eksekusi idenya adalah ${difficulty}. buat idenya dalam bahasa indonesia`,
              },
            ],
            temperature: 1,
            stream: true,
          }),
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = res.body;
        if (!data) {
          return;
        }

        const onParse = (event: ParsedEvent | ReconnectInterval) => {
          if (event.type === "event") {
            const data = event.data;
            try {
              const text = JSON.parse(data).text ?? "";
              setSummary((prev) => prev + text);
            } catch (e) {
              console.error(e);
            }
          }
        };

        const reader = data.getReader();
        const decoder = new TextDecoder();
        const parser = createParser(onParse);
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          parser.feed(chunkValue);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const callbackDrop = (e: string, isStatus: string) => {
    if (isStatus === "category") {
      setCategory(e);
    } else if (isStatus === "difficulty") {
      setDifficulty(e);
    } else {
      setTarget(e);
    }
  };

  const handleCopy = (e: any) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(summary)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  const handleClear = () => {
    setInput("");
  };

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (
      isLoadingPage === "true" &&
      localStorage.getItem("redirectPage") === "idekan"
    ) {
      localStorage.setItem("loading", "false");
      setIsLoadingPage("false");
    }
  }, [isLoading, isLoadingPage]);

  useEffect(() => {
    setTimeout(function () {
      localStorage.setItem("redirectPage", "");
    }, 1000);
  }, []);
  return (
    <>
      {isLoadingPage === "false" ? (
        <div className="w-full flex justify-around text-[.8rem] pb-[2rem] dark:bg-black">
          <div className="md:w-[70%] w-[90%] inline dark:bg-black">
            <Title
              title="Mencari Inspirasi Ide Dengan Idekan"
              more="Selamat Ber-ide"
            />

            <div className="md:flex justify-between w-full md:space-x-[1.3rem]">
              <div className="w-full">
                <Instruction
                  number="1"
                  instructions="Pilih Kategori"
                  suggestions="Atau Masukkan Kategori Baru"
                />
                <DropDown
                  placeHolder="Seni"
                  arrayDrop={[
                    "Teknologi",
                    "Pendidikan",
                    "Bisnis & Kewirausahaan",
                    "Model dan Desain",
                    "Kesehatan",
                    "Hiburan",
                    "Seni",
                  ]}
                  callbackDrop={callbackDrop}
                  isStatus="category"
                />
              </div>
              <div className="w-full">
                <Instruction
                  number="2"
                  instructions="Pilih Target Ide"
                  suggestions="Atau Masukkan Target Baru"
                />
                <DropDown
                  placeHolder="Mahasiswa"
                  arrayDrop={["Mahasiswa", "Orang tua", "Dosen", "Guru"]}
                  callbackDrop={callbackDrop}
                  isStatus="target"
                />
              </div>
            </div>
            <Instruction
              number="3"
              instructions="Masukkan Ide Anda"
              suggestions=""
            />
            <div className="relative">
              <textarea
                placeholder="Contoh: Sebuah Produk"
                className="w-full dark:text-white border-[1.5px] dark:bg-[#0F0F0F] border-gray-200 dark:border-gray-500 rounded-md appearance-none h-[5rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] dark:scrollbar-track-[#0F0F0F] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] text-gray-600 "
                name=""
                id=""
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    startResume();
                  }
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setInput(e.target.value);
                  setInputRequired(false);
                }}
              />
              <p className={`${inputRequired ? "" : "hidden"}`}>
                Jangan Lupa Masukan Teks Teman-teman!
              </p>
              <button
                className="absolute z-1 right-5 top-[2.5rem]"
                onClick={handleClear}
              >
                <div className="relative pl-2">
                  <Image
                    alt="turtles"
                    src="/clean.png"
                    width={500}
                    height={0}
                    className="w-[1.5rem] dark:invert"
                    onMouseEnter={() => setHoverClear(true)}
                    onMouseLeave={() => setHoverClear(false)}
                  ></Image>
                  <div
                    className={`rounded-md absolute h-[2rem] top-0 mt-[100%] left-0 transition duration-200 ${
                      hoverClear ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <div className="bg-gray-200 dark:bg-[#0F0F0F] bottom-[-.9rem] mr-[1rem] px-2 rounded-md">
                      bersihkan
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <Instruction
              number="4"
              instructions="Masukkan Tingat Kesulitan Eksekusi Ide"
              suggestions=""
            />
            <div className="flex space-x-5">
              <DropDown
                placeHolder="Mudah"
                arrayDrop={["Mudah", "Sedang", "Sulit"]}
                callbackDrop={callbackDrop}
                isStatus="difficulty"
              />
              <button
                onClick={startResume}
                className="w-full bg-black dark:bg-[#204635] text-white font-bold rounded-md  hover:bg-gray-900 dark:hover:bg-[#163426] flex items-center justify-center space-x-[1rem]"
              >
                <div
                  className={`flex items-center justify-center  ${
                    isLoading ? "" : "hidden"
                  }`}
                >
                  <div className="rounded-full overflow-hidden w-[1.5rem] h-[1.5rem]">
                    <Image
                      alt="turtles"
                      src="/spinner-of-dots.png"
                      width={500}
                      height={200}
                      className="w-full h-full object-cover invert animate-spin"
                    ></Image>
                  </div>
                </div>
                {isLoading ? <p>Loading ...</p> : <p>Buat Ide</p>}
              </button>
            </div>
            <div className="relative z-0">
              <div
                id=""
                className="text-gray-600 dark:text-white w-full border-[1.5px] border-gray-200 dark:border-gray-500 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mt-[1.4rem] whitespace-pre-wrap dark:scrollbar-track-[#0F0F0F]"
              >
                {summary}
              </div>
              <button
                className="absolute z-1 right-5 top-5"
                onClick={handleCopy}
              >
                <div className="relative pl-2">
                  <Image
                    alt="turtles"
                    src="/copy.png"
                    width={500}
                    height={500}
                    className="w-[1.5rem] dark:invert"
                    onMouseEnter={() => setHoverCopy(true)}
                    onMouseLeave={() => setHoverCopy(false)}
                  ></Image>
                  <div
                    className={`rounded-md absolute h-[2rem] top-0 mt-[100%] left-0 transition duration-200 ${
                      hoverCopy ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <div className="bg-gray-200 dark:bg-[#0F0F0F] bottom-[-.9rem] mr-[1rem] px-2 rounded-md">
                      copy
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[100vh] justify-around flex items-center">
          Loading...
        </div>
      )}
    </>
  );
}
