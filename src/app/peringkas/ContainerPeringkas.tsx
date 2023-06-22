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
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState("");
  const [sentenceLength, setSentenceLength] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [summary, setSummary] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const startResume = async () => {
    setQuestions([...questions, { chat: input }]);
    setInput("");
    // setIsLoading(true);
    try {
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
              console.log(content);
            }
          }
          setSummary(completeSummary);
        }
      }
    } catch (error) {
      console.log(error);
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
    console.log("copy");
  };
  console.log(input);
  return (
    <div className="w-full flex justify-around text-[.8rem]">
      <div className="w-[70%] inline py-[2rem]">
        <textarea
          placeholder="Masukkan kalimat yang ingin anda ringkas"
          className="w-full border-[1.5px] border-gray-200 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mb-[1.1rem] text-gray-600 "
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
          }}
        />
        <div className="flex space-x-5 ">
          <div className="w-full relative space-y-[.4rem]">
            <input
              placeholder="Masukkan jumlah kalimat"
              type="number"
              onChange={(e) => {
                setSentenceLength(e.target.value);
              }}
              value={sentenceLength}
              className="w-full border-[1.5px] rounded-md flex px-[1rem] py-[1rem] space-x-[.7rem] text-gray-600 "
            />
          </div>
          <button
            onClick={startResume}
            className="w-full bg-black text-white font-bold rounded-md  hover:bg-gray-900"
          >
            Mulai Meringkas
          </button>
        </div>
        <div className="relative z-0">
          <div
            id=""
            className="text-gray-600 w-full border-[1.5px] border-gray-200 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none py-[1rem] mt-[1.4rem] "
          >
            {summary}
          </div>
          <button className="absolute z-1 right-5 top-8" onClick={handleCopy}>
            <Image
              alt="turtles"
              src="/copy.png"
              width={500}
              height={0}
              className="w-[1.5rem]"
            ></Image>
          </button>
        </div>
      </div>
    </div>
  );
}
