"use client";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Instruction from "../components/generateAiComponent/Instruction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Title from "../components/generateAiComponent/Title";

export default function ContainerParaphrase() {
  let theLoadings: any;
  if (typeof window !== "undefined") {
    theLoadings = localStorage.getItem("loading");
  }
  const theLoading = theLoadings;
  const [input, setInput] = useState<string>("");
  const [questions, setQuestions] = useState<{ chat: any }[]>([]);
  const [sentenceLength, setSentenceLength] = useState("");
  const [summary, setSummary] = useState("");
  const [hoverClear, setHoverClear] = useState(false);
  const [hoverCopy, setHoverCopy] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputRequired, setInputRequired] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(theLoading);

  const session = useSession();
  const router = useRouter();

  const arrayMode = ["Standar", "Formal", "Simpel", "Creatif"];

  const startResume = async () => {
    setQuestions([...questions, { chat: input }]);
    setIsLoading(false);
    let temperatures = 0;
    if (selected === "Creatif") {
      temperatures = 1;
    }
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
                content: `You are a language model that can paraphrase a sentences, help user to paraphrasing sentences while keeping the length relatively similar to the original. By using different wording and structure, a paraphrased version that avoids plagiarism detection.`,
              },
              {
                role: "user",
                content: `make this sentence ${input} in a ${selected} mode in indonesian languange`,
              },
            ],
            temperature: temperatures,
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

  const hanldeDropDown = () => {
    setIsDrop(!isDrop);
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (
      isLoadingPage === "true" &&
      localStorage.getItem("redirectPage") === "paraphrase"
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
          <div className="md:w-[70%] w-[90%] inline">
            <Title
              title="Hindari Plagiarisme Dengan Paraphrase"
              more="Selamat Memparaphrase"
            />

            <Instruction
              number="1"
              instructions="Copy teks yang ingin anda paraphrase"
              suggestions="Atau ketik teks"
            />
            <div className="relative">
              <textarea
                placeholder="Contoh: Teknologi dapat diartikan sebagai penerapan ilmu pengetahuan, penemuan, dan keterampilan yang digunakan untuk merancang, membuat, dan memanfaatkan alat, mesin, perangkat lunak, sistem, dan proses untuk memecahkan masalah dan memenuhi kebutuhan pendidikan....."
                className="text-gray-600 w-full border-[1.5px] px-5 border-gray-200 dark:border-gray-500 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mt-[1.4rem] whitespace-pre-wrap dark:scrollbar-track-[#0F0F0F] dark:text-white dark:bg-black"
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
                Jangan Lupa Masukan Teksmu!
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
                    onMouseEnter={(e) => setHoverClear(true)}
                    onMouseLeave={(e) => setHoverClear(false)}
                  ></Image>
                  <div
                    className={`rounded-md absolute h-[2rem] top-0 mt-[100%] left-0 transition duration-200 ${
                      hoverClear ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <div className="bg-gray-200 dark:bg-[#0F0F0F] bottom-[-.9rem] mr-[1rem] px-2 rounded-md ">
                      bersihkan
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <Instruction
              number="2"
              instructions="Masukkan Mode Paraphrase Anda"
              suggestions=""
            />
            <div className="md:flex md:space-x-5 space-y-[.6rem] md:space-y-0 ">
              <div className="w-full relative space-y-[.4rem]">
                <button
                  onClick={hanldeDropDown}
                  className="w-full border-[1.5px] dark:border-gray-500 rounded-md flex px-[1rem] py-[1rem] space-x-[.7rem]"
                >
                  <Image
                    alt="turtles"
                    src="/down.png"
                    width={500}
                    height={0}
                    className={`w-[1.5rem] transform duration-100 dark:invert ${
                      isDrop ? "rotate-180" : ""
                    }`}
                  ></Image>
                  <p className={`${isSelected ? "" : "text-gray-400"}`}>
                    {isSelected ? selected : "Contoh : Creative"}
                  </p>
                </button>
                <div
                  className={`transfrom duration-100 ease-in ${
                    isDrop ? "z-10" : "hidden opacity-0"
                  } absolute bg-white dark:bg-[#0F0F0F] border-[1.5px] dark:border-gray-500 rounded-md w-full right-0 overflow-y-scroll border-t-[1px] scrollbar-thin scrollbar-track-[#F5F8FA] dark:scrollbar-track-[#0F0F0F] scrollbar-thumb-black dark:scrollbar-thumb-light focus:ring-0 focus:outline-none`}
                >
                  <div className="">
                    {arrayMode.map((item, key) => (
                      <div
                        key={key}
                        onClick={(e) => {
                          setSelected(item);
                          setIsSelected(true);
                          setIsDrop(false);
                        }}
                        className={`${
                          key === arrayMode.length - 1
                            ? ""
                            : "border-b-[1.5px] dark:border-b-gray-500"
                        } py-[.5rem] px-[1rem] cursor-pointer trasnform duration-200 hover:bg-black hover:text-white w-full`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full">
                <button
                  onClick={startResume}
                  className="w-full bg-black dark:bg-[#D48429] dark:text-black dark:hover:bg-[#B66C18]  text-white font-bold rounded-md hover:bg-gray-900 flex items-center justify-center space-x-[1rem] h-[4rem] md:h-full"
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
                        className="w-full h-full object-cover invert animate-spin dark:invert"
                      ></Image>
                    </div>
                  </div>
                  {isLoading ? <p>Loading ...</p> : <p>Mulai Paraphrase</p>}
                </button>
              </div>
            </div>
            <div className="relative z-0">
              <div
                id=""
                className="text-gray-600 w-full border-[1.5px] border-gray-200 dark:border-gray-500 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mt-[1.4rem] whitespace-pre-wrap dark:scrollbar-track-[#0F0F0F] dark:text-white"
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
                    height={0}
                    className="w-[1.5rem] dark:invert"
                    onMouseEnter={(e) => setHoverCopy(true)}
                    onMouseLeave={(e) => setHoverCopy(false)}
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
