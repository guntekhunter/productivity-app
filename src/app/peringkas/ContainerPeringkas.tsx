"use client";
import React, { useState } from "react";

export default function ContainerPeringkas() {
  const [input, setInput] = useState<string>("");
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
      <button>Ringkas</button>
    </div>
  );
}
