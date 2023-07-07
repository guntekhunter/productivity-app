"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import ListComponent from "./ListComponent";
import AddListButton from "./AddListButton";
import axios from "axios";
import { useSession } from "next-auth/react";
import LoadingList from "../loading/LoadingList";

//@ts-ignore
export default function List({ color }) {
  const [isLoading, setIsLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
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

  const deleteCallBack = (index: number, id: number) => {
    list.splice(index, 1);
    listId.splice(index, 1);
    const deletedList = [...list];
    const deletedListId = [...listId];
    setList(deletedList);
    setListId(deletedListId);
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
        setIsLoading(true);
        const listData = await axios.get("/api/list");
        const data = listData.data.data;
        const filteredData = data.filter((item: any) => item.userId === id);
        const names = filteredData.map((item: any) => item.listName);
        const idList = filteredData.map((item: any) => item.id);
        setListId(idList);
        setList(names);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchList();
  }, [id]);

  return (
    <section className="mt-[2rem] flex justify-around overflow-hidden">
      <div className="md:w-[60%] w-[90%] py-[2rem] space-y-2">
        {isLoading ? (
          <LoadingList />
        ) : (
          list.length > 0 &&
          list.map((item, key) => {
            const id = listId[list.indexOf(item)];
            return (
              <>
                {!isLoading ? (
                  <ListComponent
                    name={item}
                    index={list.indexOf(item)}
                    id={id}
                    key={key}
                    color={color}
                    callback={callbackEdit}
                    deleted={deleteCallBack}
                  />
                ) : (
                  <LoadingList />
                )}
              </>
            );
          })
        )}
        <AddListButton callback={callbackButton} />
      </div>
    </section>
  );
}
