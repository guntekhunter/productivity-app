import React from "react";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../../components/getPostMetaData";
import Title from "@/app/components/generateAiComponent/Title";

const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => {
    slug: post.slug;
  });
};

export default function page(props: any) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div className="w-full flex justify-around text-[.8rem] pb-[2rem] dark:bg-black">
      <div className="md:w-[70%] w-[90%] inline dark:bg-black">
        <div className="w-full align-center justify-center flex py-[2rem]">
          <h1 className="text-[3rem] font-bold text-center space-y-2 leading-[3.4rem]">
            {post.data.title}
          </h1>
        </div>
        <article className="prose porse-li:text-[1rem] dark:text-[1rem] dark:prose-invert prose lg:prose-xl">
          <p className="color-gray-200 text-gray-500">{post.data.date}</p>
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    </div>
  );
}
