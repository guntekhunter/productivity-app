"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ListComponent from "./ListComponent";
import AddListButton from "./AddListButton";

//@ts-ignore
export default function List({ color }) {
  const [list, setList] = useState<string[]>([]);

  const callbackButton = async (value: string) => {
    setList((prev) => [...prev, value]);
  };

  const callbackEdit = async (name: string, index: number) => {
    setList((prevList) =>
      prevList.map((item, i) => (i === index ? name : item))
    );
  };

  const deleteCallBack = (index: number) => {
    console.log(index);
    list.splice(index, 1);
    const deletedList = [...list];
    setList(deletedList);
  };

  console.log(list);
  return (
    <section className="mt-[2rem] flex justify-around overflow-hidden">
      <div className="w-[60%] py-[2rem] space-y-2">
        {list.map((item, key) => (
          <ListComponent
            name={item}
            index={list.indexOf(item)}
            key={key}
            color={color}
            callback={callbackEdit}
            deleted={deleteCallBack}
          />
        ))}
        <AddListButton callback={callbackButton} />
      </div>
    </section>
  );
}
