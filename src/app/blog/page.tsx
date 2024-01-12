import React from "react";
import Title from "../components/generateAiComponent/Title";
import getPostMetadata from "../../../components/getPostMetaData";
import PostPreview from "../../../components/PostPreview";

export default function page() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));
  return (
    <div>
      <div className="w-full flex justify-around pb-[2rem] dark:bg-black">
        <div className="md:w-[70%] w-[90%] inline dark:bg-black">
          <Title title="Blog" more="Selamat Membaca teman-teman" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postPreviews}
          </div>
        </div>
      </div>
    </div>
  );
}
