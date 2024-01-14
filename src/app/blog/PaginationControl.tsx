"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PaginationControl() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? "1";

  const per_page = searchParams?.get("per_page") ?? "3";

  console.log(searchParams?.get("page") ?? "1");
  console.log(page);

  const pagination = (e: any) => {
    if (e === "prev") {
      router.push(
        `blog/?page=${Number(page) - 1}&per_page=${Number(per_page)}`
      );
    } else {
      router.push(
        `blog/?page=${Number(page) + 1}&per_page=${Number(per_page)}`
      );
    }
  };

  console.log(page);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            pagination("prev");
          }}
        >
          prev page
        </button>

        <div>
          {page} / {Math.ceil(10 / Number(per_page) - 1)}
        </div>
        <button
          onClick={() => {
            pagination("next");
          }}
        >
          next page
        </button>
      </div>
    </div>
  );
}
