"use client";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import React, { useState } from "react";

export default function ContainerPeringkas() {
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [questions, setQuestions] = useState<{ chat: any }[]>([]);

  const startResume = async () => {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    let counter = 0;

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
              content: input,
            },
          ],
          stream: true,
        }),
      });

      // const chat = await res.json();
      // console.log(chat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <textarea
        name=""
        id=""
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={startResume}>Ringkas</button>
    </div>
  );
}
