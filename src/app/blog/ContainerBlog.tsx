"use client";
import React, { useEffect, useState } from "react";
import Title from "../components/generateAiComponent/Title";


export default function ContainerBlog() {
  let theLoadings: any;
  if (typeof window !== "undefined") {
    theLoadings = localStorage.getItem("loading");
  }
  const theLoading = theLoadings;
  const [isLoadingPage, setIsLoadingPage] = useState(theLoading);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (
      isLoadingPage === "true" &&
      localStorage.getItem("redirectPage") === "idekan"
    ) {
      localStorage.setItem("loading", "false");
      setIsLoadingPage("false");
    }
  }, [isLoading, isLoadingPage]);
  return (
    <>
      {isLoadingPage === "false" ? (
        <div className="w-full flex justify-around text-[.8rem] pb-[2rem] dark:bg-black">
          <div className="md:w-[70%] w-[90%] inline dark:bg-black">
            <Title title="Blog" more="Selamat Membaca teman-teman" />
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
