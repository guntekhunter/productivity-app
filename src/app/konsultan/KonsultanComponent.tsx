"use client";
import React, { useEffect, useState } from "react";
import consultAi from "../props/consultAi.json";
import Image from "next/image";
import Title from "../components/generateAiComponent/Title";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConsultationDescription from "../components/generateAiComponent/ConsultationDescription";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";

export default function KonsultanComponent() {
  let theLoadings: any;
  if (typeof window !== "undefined") {
    theLoadings = localStorage.getItem("loading");
  }
  const theLoading = theLoadings;
  const [input, setInput] = useState("");
  const [individualAnswer, setIndividualAnswer] = useState("");
  const [hoverCopy, setHoverCopy] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [summary, setSummary] = useState("");
  const [answer, setAnswer] = useState<{ chat: any; type: string }[]>([]);
  const [question, setQuestion] = useState<{ chat: any; type: string }[]>([]);
  const [arrayChat, setArrayChat] = useState<{ chat: any; type: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(theLoading);

  const sendMessage = async () => {
    let loading = true;
    setQuestion([...question, { chat: input, type: "question" }]);
    setIsLoading(true);
    setInput("");

    const conversation = arrayChat.map((item) => item.chat);
    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Previous Conversation:\n ${conversation} make all response in indonesian, and user name is ${session.data?.user?.name}`,
            },
            {
              role: "user",
              content: `${input}`,
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

      let completeSummary = "";

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          try {
            const text = JSON.parse(data).text ?? "";
            completeSummary += text;
          } catch (e) {
            console.error(e);
          }
        }
      };
      setIndividualAnswer(completeSummary);

      const reader = data.getReader();
      const decoder = new TextDecoder();
      const parser = createParser(onParse);
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        parser.feed(chunkValue);
        setAnswer([...answer, { chat: completeSummary, type: "answer" }]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const combinedArray = [];

    const maxLength = Math.max(question.length, answer.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < question.length) {
        combinedArray.push(question[i]);
      }
      if (i < answer.length) {
        combinedArray.push(answer[i]);
      }
    }

    setArrayChat(combinedArray.reverse());
  }, [question, answer]);

  const session = useSession();
  const router = useRouter();

  const handleCopy = (e: any, item: any) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(item)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (
      isLoadingPage === "true" &&
      localStorage.getItem("redirectPage") === "konsultan"
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
        <div className="w-full flex justify-around ">
          <div className="md:w-[70%] w-full py-2">
            <div className="px-[1rem]">
              <Title
                title="Merasa Bernout?, Kami siap membantu melewatinya"
                more="Silahkan Ceritakan dibawah 👇😊 dan AI akan membantu melewati kesulitan anda. Semua data percakapan
          tidak akan bisa diakses oleh sipapun"
              />
            </div>
            <div className="w-full border-[1.5px] md:h-[30rem] h-[35rem] rounded-md flex flex-col">
              <div className="flex-1 flex flex-col-reverse px-[2rem] pt-[1.5rem] space-y-[2rem] overflow-y-scroll scrollbar-thin scrollbar-track-[#F5F8FA] scrollbar-thumb-black py-[1rem]">
                {arrayChat.map((item, key) => (
                  <div
                    key={key}
                    className={`${
                      item.type === "question"
                        ? "flex items-end justify-end w-full"
                        : "flex items-start justify-start w-full mt-5"
                    } `}
                  >
                    <div className="md:w-[30rem] w-[17rem]">
                      <div
                        className={`rounded-md whitespace-pre-wrap ${
                          item.type === "question"
                            ? "flex items-end justify-end"
                            : "flex items-start justify-start"
                        }`}
                      >
                        <p
                          className={`rounded-md relative ${
                            item.type === "question"
                              ? "flex items-end justify-end shadow-md bg-black text-white px-[1rem] py-[.5rem]"
                              : "flex items-start justify-start shadow-md bg-white pr-[3rem] py-[1rem] pl-[1rem]"
                          }`}
                        >
                          {item.chat}
                          <button
                            onClick={(e) => handleCopy(e, item.chat)}
                            className={`absolute z-1 right-5 bottom-[1rem] ${
                              item.type === "question" ? "hidden" : ""
                            }`}
                          >
                            <Image
                              alt="turtles"
                              src="/copy.png"
                              width={500}
                              height={500}
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
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-[5rem] flex flex-rows items-center px-[2rem] py-4 space-x-2 bg-gray-100">
                <div className="flex-1">
                  <input
                    value={input}
                    placeholder="Ketik Pesan"
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    type="text"
                    className="w-full h-[2rem] px-[.5rem]"
                  />
                </div>
                <button
                  className="bg-black text-white rounded-md hover:bg-gray-900 w-[5rem] h-[2rem] flex justify-center items-center"
                  onClick={sendMessage}
                >
                  {isLoading ? (
                    <Image
                      alt="turtles"
                      src="/spinner-of-dots.png"
                      width={500}
                      height={200}
                      className="w-[1rem] object-cover invert animate-spin"
                    ></Image>
                  ) : (
                    <p>Kirim</p>
                  )}
                </button>
              </div>
            </div>
            <div className="px-[1rem]">
              <ConsultationDescription />
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
