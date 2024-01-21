import Link from "next/link";
import React from "react";
import { PostMetadata } from "./PostMetadata";

export default function PostPreview(props: PostMetadata) {
  return (
    <div className="shadow-md border border-slate-200 border-4 border-indigo-500/100 dark:bg-[#0F0F0F]">
      <div className="p-[2rem]">
        <Link href={`/blog/${props.slug}`}>
          <h1 className="font-bold text-[1rem] hover:bg-sky-700">
            {props.title}
          </h1>
        </Link>
        <p className="text-[.8rem] color-gray-200 text-gray-500">
          {props.date}
        </p>
        <p className="text-[.8rem]">{props.subtitle}</p>
      </div>
    </div>
  );
}
