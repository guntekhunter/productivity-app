import React from "react";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../../components/getPostMetaData";
import Title from "@/app/components/generateAiComponent/Title";
import PostPreview from "../../../../components/PostPreview";
import Link from "next/link";

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
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata
    .slice(0, 3)
    .map((post, index) => <PostPreview key={post.slug} {...post} />);

  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div className="w-full flex justify-around pb-[2rem] dark:bg-black">
      <div className="md:w-[70%] w-[90%] inline dark:bg-black">
        <div className="w-full align-center justify-center flex py-[2rem]">
          <h1 className="text-[3rem] font-bold text-center space-y-2 leading-[3.4rem]">
            {post.data.title}
          </h1>
        </div>
        <article className="prose prose-li:text-[1rem] prose-p:text-[1rem] dark:text-[1rem] dark:prose-invert prose lg:prose-xl max-w-5xl mx-auto">
          <p className="color-gray-200 text-gray-500">{post.data.date}</p>
          <Markdown>{post.content}</Markdown>
        </article>
        <div className="border-t-[1px] border-gray-300 mt-[5rem]"></div>
        <div className="py-[1.5rem]">
          <h1 className="text-[1.5rem] font-bold text-left space-y-2 leading-[3.4rem]">
            Blog Lainnya
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {postPreviews}
        </div>
        <Link href="/blog">
          <div className="bg-black text-white px-[1.5rem] py-[.3rem] rounded-md my-[2rem] text-center dark:invert">
            <p>Lihat Blog Lainnya</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
