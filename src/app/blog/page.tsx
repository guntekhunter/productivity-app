import React from "react";
import Title from "../components/generateAiComponent/Title";
import getPostMetadata from "../../../components/getPostMetaData";
import PostPreview from "../../../components/PostPreview";
import PaginationControl from "./PaginationControl";

export default function page(currentPage: any) {
  const postMetadata = getPostMetadata();

  const page = currentPage.searchParams["page"] ?? "1";
  const per_page = currentPage.searchParams["per_page"] ?? "4";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = postMetadata.slice(start, end);
  const postPreviews = entries.map((post) => (
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
          <PaginationControl />
        </div>
      </div>
    </div>
  );
}
