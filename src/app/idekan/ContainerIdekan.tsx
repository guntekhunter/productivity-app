"use client";
import React, { useState } from "react";
import Instruction from "../components/generateAiComponent/Instruction";
import Image from "next/image";
import DropDown from "../components/generateAiComponent/DropDown";

export default function ContainerIdekan() {
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [target, setTarget] = useState("");

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
                content: `make this sentence ${input} in a ${selected} mode`,
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
            setIsLoading(false);
          }
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

  console.log(target, difficulty, category);
  return (
    <div className="w-full flex justify-around text-[.8rem] mb-[2rem]">
      <div className="w-[70%] inline">
        <div className="w-full flex justify-around py-[2rem]">
          <div className="w-[30rem]">
            <p className="text-[3rem] font-bold text-center space-y-2 leading-[3.1rem]">
              Hindari Plagiarisme Dengan Paraphrase
            </p>
            <p className="font-bold text-center space-y-2 leading-[3.1rem] text-gray-500">
              Selamat Memparaphrase
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full space-x-[1.3rem]">
          <div className="w-full">
            <Instruction
              number="1"
              instructions="Pilih Kategori"
              suggestions="Atau Masukkan Kategori Baru"
            />
            <DropDown
              arrayDrop={["Standar", "Formal", "Simpel", "Creatif"]}
              callbackDrop={callbackDrop}
              isStatus="category"
            />
          </div>
          <div className="w-full">
            <Instruction
              number="1"
              instructions="Pilih Kategori"
              suggestions="Atau Masukkan Kategori Baru"
            />
            <DropDown
              arrayDrop={["Standar", "Formal", "Simpel", "Creatif"]}
              callbackDrop={callbackDrop}
              isStatus="target"
            />
          </div>
        </div>
        <Instruction
          number="1"
          instructions="Copy teks yang ingin anda paraphrase"
          suggestions="Atau ketik teks"
        />
        <div className="relative">
          <textarea
            placeholder="ahhay"
            className="w-full border-[1.5px] border-gray-200 rounded-md appearance-none h-[5rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] text-gray-600 "
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
                onMouseEnter={() => setHoverClear(true)}
                onMouseLeave={() => setHoverClear(false)}
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
        <div className="flex space-x-5">
          <DropDown
            arrayDrop={["Standar", "Formal", "Simpel", "Kreatif"]}
            callbackDrop={callbackDrop}
            isStatus="difficulty"
          />
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
            {isLoading ? <p>Loading ...</p> : <p>Mulai Paraphrase</p>}
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
                onMouseEnter={() => setHoverCopy(true)}
                onMouseLeave={() => setHoverCopy(false)}
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
