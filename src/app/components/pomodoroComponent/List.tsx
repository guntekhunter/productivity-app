"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ListComponent from "./ListComponent";
import AddListButton from "./AddListButton";
import axios from "axios";
import { useSession } from "next-auth/react";

//@ts-ignore
export default function List({ color }) {
  const [list, setList] = useState<string[]>([]);
  const [listChecked, setListChecked] = useState<number[]>([]);
  const [listId, setListId] = useState<number[]>([]);
  const [id, setId] = useState(0);
  const { data: session } = useSession();

  const callbackButton = async (value: string) => {
    setList((prev) => [...prev, value]);
  };

  const callbackEdit = async (name: string, index: number) => {
    setList((prevList) =>
      prevList.map((item, i) => (i === index ? name : item))
    );
  };

  const deleteCallBack = (index: number) => {
    list.splice(index, 1);
    const deletedList = [...list];
    setList(deletedList);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const listUser = await axios.get("/api/user");
        const user = listUser.data.data;
        const filteredData = user.filter(
          (item: any) => item.email === session?.user?.email
        );
        const idUser = filteredData.map((item: any) => item.id);
        setId(idUser[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [session?.user?.email]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const listData = await axios.get("/api/list");
        const data = listData.data.data;
        const filteredData = data.filter((item: any) => item.userId === id);
        const names = filteredData.map((item: any) => item.listName);
        const idList = filteredData.map((item: any) => item.id);
        setListId(idList);
        setList(names);
      } catch (error) {
        console.log(error);
      }
    };

    fetchList();
  }, [id]);

  console.log(listId);
  console.log(list);

  return (
    <section className="mt-[2rem] flex justify-around overflow-hidden">
      <div className="md:w-[60%] w-[90%] py-[2rem] space-y-2">
        {list.map((item, key) => {
          const id = listId[list.indexOf(item)];
          return (
            <ListComponent
              name={item}
              index={list.indexOf(item)}
              id={id}
              key={key}
              color={color}
              callback={callbackEdit}
              deleted={deleteCallBack}
            />
          );
        })}
        <AddListButton callback={callbackButton} />
      </div>
    </section>
  );
}
