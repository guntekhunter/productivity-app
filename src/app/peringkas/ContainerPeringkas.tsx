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
  const [isSelected, setIsSelected] = useState(false);
  const arrayPersentage = [
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
  ];

  const startResume = async () => {
    const props = `Create a summary of the following sentence, ${input} making it ${selected} shorter than the original sentence. in indonesian`;
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
              role: "user",
              content: props,
            },
          ],
        }),
      });

      const chat = await res.json();
      const chatData = chat.choices[0].message.content;
      console.log(chatData);
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeDropDown = () => {
    setIsDrop(!isDrop);
    // setIsSelected(!isSelected);
  };
  return (
    <div className="w-full flex justify-around">
      <div className="w-[70%] inline py-[2rem]">
        <textarea
          className="w-full border-[1.5px] border-gray-200 rounded-md appearance-none h-[15rem] overflow-y-scroll border-t-[1px] px-5 scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black resize-none focus:ring-0 focus:outline-none  py-[1rem]"
          name=""
          id=""
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              startResume();
            }
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="flex space-x-5 text-[1rem]">
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
                className={`w-[1.5rem]`}
              ></Image>
              <p>{isSelected ? selected : "Pilih Panjang ringkasan"}</p>
            </button>
            <div
              className={`${
                isDrop ? "" : "hidden"
              } absolute bg-white border-[1.5px] rounded-md w-full right-0 h-[5rem] overflow-y-scroll border-t-[1px] scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black focus:ring-0 focus:outline-none`}
            >
              <div className="">
                {arrayPersentage.map((item, key) => (
                  <div
                    key={key}
                    onClick={(e) => {
                      setSelected(item);
                      setIsSelected(true);
                      setIsDrop(false);
                    }}
                    className={`${
                      key === arrayPersentage.length - 1
                        ? ""
                        : "border-b-[1.5px]"
                    } py-[.5rem] px-[1rem] cursor-pointer hover:bg-black hover:text-white w-full`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={startResume}
            className="w-full bg-black text-white py-[1rem] font-bold rounded-md"
          >
            Ringkas
          </button>
        </div>
      </div>
    </div>
  );
}
