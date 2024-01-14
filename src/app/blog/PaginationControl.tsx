"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PaginationControl() {
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? "1";

  const per_page = searchParams?.get("per_page") ?? "6";

  console.log(searchParams?.get("page") ?? "1");
  console.log(page);

  const pagination = (e: any) => {
    if (e === "prev" && Number(page) > 1) {
      setIsNext(false);
      setIsPrev(false);
      router.push(
        `blog/?page=${Number(page) - 1}&per_page=${Number(per_page)}`
      );
    } else if (
      e === "next" &&
      Number(page) < Math.ceil(10 / Number(per_page) - 1)
    ) {
      setIsPrev(false);
      setIsNext(false);
      router.push(
        `blog/?page=${Number(page) + 1}&per_page=${Number(per_page)}`
      );
    }
  };

  console.log(page);
  return (
    <div className="flex justify-center py-[2rem]">
      <div className="flex space-x-[2rem]">
        <button
          className="bg-black dark:invert text-white px-[1.5rem] py-[.3rem] rounded-md"
          onClick={() => {
            pagination("prev");
          }}
          disabled={isPrev}
        >
          Sebelum
        </button>

        <div className="text-center grid content-center">
          {page} / {Math.ceil(10 / Number(per_page) - 1)}
        </div>
        <button
          className="bg-black text-white px-[1.5rem] py-[.3rem] rounded-md dark:invert"
          onClick={() => {
            pagination("next");
          }}
          disabled={isNext}
        >
          Selanjukna
        </button>
      </div>
    </div>
  );
}
