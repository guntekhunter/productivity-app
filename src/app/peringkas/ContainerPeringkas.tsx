"use client";
import React, { useEffect, useState } from "react";
import useMutation from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { Message } from "../lib/validators/message";

export default function ContainerPeringkas() {
  const [input, setInput] = useState<string>("");

  const fetchData = async (message: Message) => {
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ messages: [message] }),
      });
      console.log("berhasil");
      return res.body;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <div>
      <textarea
        name=""
        id=""
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const message: Message = {
              id: nanoid(),
              isUser: true,
              text: input,
            };

            fetchData(message);
          }
        }}
      />
      <button>Ringkas</button>
    </div>
  );
}
