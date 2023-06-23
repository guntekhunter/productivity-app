"use client";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import React, { useState } from "react";
import Image from "next/image";

export default function ContainerPeringkas() {
  const [input, setInput] = useState<string>("");
  const [questions, setQuestions] = useState<{ chat: any }[]>([]);
  const [sentenceLength, setSentenceLength] = useState("");
  const [summary, setSummary] = useState("");
  const [hoverClear, setHoverClear] = useState(false);
  const [hoverCopy, setHoverCopy] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputRequired, setInputRequired] = useState(false);

  const startResume = async () => {
    setQuestions([...questions, { chat: input }]);
    setIsLoading(false);
    if (!input) {
      setInputRequired(true);
    } else {
      try {
        setIsLoading(true);
        const res = await fetch("/api/resume", {
          method: "POST",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a language model that can generate summaries. make it in ${sentenceLength} sentences`,
              },
              {
                role: "user",
                content: input,
              },
            ],
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
  return (
    <div className="w-full flex justify-around text-[.8rem] mb-[2rem]">
      <div className="w-[70%] inline">
        <div className="w-full flex justify-around py-[2rem]">
          <div className="w-[30rem]">
            <p className="text-[3rem] font-bold text-center space-y-2 leading-[3.1rem]">
              Ringkas Kalimat Teman-teman
            </p>
            <p className="font-bold text-center space-y-2 leading-[3.1rem] text-gray-500">
              Selamat Meringkas
            </p>
          </div>
        </div>
        <div className="py-2 flex space-x-2">
          <div className="bg-black text-white w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center font-bold">
            <p className="text-center">1</p>
          </div>
          <div className="flex items-center justify-center font-bold">
            <p>
              Copy teks yang ingin anda ringkas{" "}
              <span className="text-gray-400">(Atau ketik teks)</span>{" "}
            </p>
          </div>
        </div>
        <div className="relative">
          <textarea
            placeholder="Contoh: Teknologi dapat diartikan sebagai penerapan ilmu pengetahuan, penemuan, dan keterampilan yang digunakan untuk merancang, membuat, dan memanfaatkan alat, mesin, perangkat lunak, sistem, dan proses untuk memecahkan masalah dan memenuhi kebutuhan manusia. Secara umum, teknologi melibatkan penggunaan pengetahuan dan keterampilan untuk menciptakan solusi yang memfasilitasi atau meningkatkan aktivitas manusia dalam berbagai bidang kehidupan, seperti komunikasi, transportasi, kesehatan, industri, pendidikan....."
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
          <button className="absolute z-1 right-5 top-5" onClick={handleClear}>
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
        <div className="py-2 flex space-x-2 mt-[1rem]">
          <div className="bg-black text-white w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center font-bold">
            <p className="text-center">2</p>
          </div>
          <div className="flex items-center justify-center font-bold">
            <p>Masukkan banyaknya kalimat ringkasan</p>
          </div>
        </div>
        <div className="flex space-x-5 ">
          <div className="w-full relative space-y-[.4rem]">
            <input
              placeholder="Contoh: 20"
              type="number"
              onChange={(e) => {
                setSentenceLength(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  startResume();
                }
              }}
              value={sentenceLength}
              className="w-full border-[1.5px] rounded-md flex px-[1rem] py-[1rem] space-x-[.7rem] text-gray-600 "
            />
          </div>
          <button
            onClick={startResume}
            className="w-full bg-black text-white font-bold rounded-md  hover:bg-gray-900 flex items-center justify-center space-x-[1rem]"
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
            {isLoading ? <p>Loading ...</p> : <p>Mulai Meringkas</p>}
          </button>
        </div>
        <div className="relative z-0">
          <div
            id=""
            className="text-gray-600 w-full border-[1.5px] border-gray-200 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mt-[1.4rem] "
          >
            {summary}
          </div>
          <button className="absolute z-1 right-5 top-5" onClick={handleCopy}>
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
  );
}
