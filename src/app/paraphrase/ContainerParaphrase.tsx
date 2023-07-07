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
import Cookies from "js-cookie";

export default function ContainerParaphrase() {
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
  const [isLoadingPage, setIsLoadingPage] = useState(Cookies.get("loading"));

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
        const reader = res.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let completeSummary = "";

        while (true) {
          if (reader) {
            const chunk = await reader.read();
            const { done, value } = chunk;
            if (done) {
              break;
            }
            const decodedChunk = decoder.decode(value);
            const lines = decodedChunk.split("\n");
            const parsedLines = lines
              .map((line) => line.replace(/^data: /, "").trim())
              .filter((line) => line !== "" && line !== "[DONE]")
              .map((line) => JSON.parse(line));

            for (const parsedLine of parsedLines) {
              const { choices } = parsedLine;
              const { delta } = choices[0];
              const { content } = delta;

              if (content) {
                completeSummary += content;
              }
            }
            setSummary(completeSummary);
          }
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
      Cookies.get("redirectPage") === "paraphrase"
    ) {
      Cookies.set("loading", "false");
      setIsLoadingPage("false");
    }
  }, [isLoading, isLoadingPage]);

  useEffect(() => {
    setTimeout(function () {
      Cookies.set("redirectPage", "");
    }, 1000);
  }, []);

  return (
    <>
      {isLoadingPage === "false" ? (
        <div className="w-full flex justify-around text-[.8rem] mb-[2rem]">
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
                className="w-full border-[1.5px] border-gray-200 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] text-gray-600 "
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
                className="absolute z-1 right-5 top-5"
                onClick={handleClear}
              >
                <div className="relative pl-2">
                  <Image
                    alt="turtles"
                    src="/clean.png"
                    width={500}
                    height={0}
                    className="w-[1.5rem]"
                    onMouseEnter={(e) => setHoverClear(true)}
                    onMouseLeave={(e) => setHoverClear(false)}
                  ></Image>
                  <div
                    className={`rounded-md absolute h-[2rem] top-0 mt-[100%] left-0 transition duration-200 ${
                      hoverClear ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <div className="bg-gray-200 bottom-[-.9rem] mr-[1rem] px-2 rounded-md">
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
            <div className="md:flex md:space-x-5 space-y-[.6rem] md:space-y-0">
              <div className="w-full relative space-y-[.4rem]">
                <button
                  onClick={hanldeDropDown}
                  className="w-full border-[1.5px] rounded-md flex px-[1rem] py-[1rem] space-x-[.7rem]"
                >
                  <Image
                    alt="turtles"
                    src="/down.png"
                    width={500}
                    height={0}
                    className={`w-[1.5rem] transform duration-100 ${
                      isDrop ? "rotate-180" : ""
                    }`}
                  ></Image>
                  <p className={`${isSelected ? "" : "text-gray-400"}`}>
                    {isSelected ? selected : "Contoh : Creative"}
                  </p>
                </button>
                <div
                  className={`transfrom duration-100 ease-in z-10 ${
                    isDrop ? "" : "opacity-0"
                  } absolute bg-white border-[1.5px] rounded-md w-full right-0 h-[5rem] overflow-y-scroll border-t-[1px] scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black focus:ring-0 focus:outline-none`}
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
                          key === arrayMode.length - 1 ? "" : "border-b-[1.5px]"
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
                  className="w-full bg-black text-white font-bold rounded-md hover:bg-gray-900 flex items-center justify-center space-x-[1rem] h-[4rem] md:h-full"
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
                  {isLoading ? <p>Loading ...</p> : <p>Mulai Paraphrase</p>}
                </button>
              </div>
            </div>
            <div className="relative z-0">
              <div
                id=""
                className="text-gray-600 w-full border-[1.5px] border-gray-200 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mt-[1.4rem] whitespace-pre-wrap"
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
                    className="w-[1.5rem]"
                    onMouseEnter={(e) => setHoverCopy(true)}
                    onMouseLeave={(e) => setHoverCopy(false)}
                  ></Image>
                  <div
                    className={`rounded-md absolute h-[2rem] top-0 mt-[100%] left-0 transition duration-200 ${
                      hoverCopy ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <div className="bg-gray-200 bottom-[-.9rem] mr-[1rem] px-2 rounded-md">
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
