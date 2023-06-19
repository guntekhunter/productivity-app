"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ListComponent from "./ListComponent";
import AddListButton from "./AddListButton";

export default function List() {
  const [list, setList] = useState<string[]>([]);

  const callbackButton = async (value: string) => {
    setList((prev) => [...prev, value]);
  };

  console.log(list);
  return (
    <section className="mt-[2rem] flex justify-around overflow-hidden">
      <div className="w-[60%] py-[2rem] space-y-2">
        {list.map((item, key) => (
          <ListComponent name={item} key={key} />
        ))}

        <AddListButton callback={callbackButton} />
      </div>
    </section>
  );
}
