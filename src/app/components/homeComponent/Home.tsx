import { DefaultSession } from "next-auth";
import Image from "next/image";
import React from "react";

export default function Home({ user }: { user: DefaultSession["user"] }) {
  return (
    <div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  );
}
