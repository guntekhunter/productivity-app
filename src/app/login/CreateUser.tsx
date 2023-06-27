"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Home from "../components/homeComponent/Home";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: session } = useSession();

  const login = () => {
    console.log(session);
    signIn();
  };
  console.log(session);

  if (session) {
    <div>
      <Home user={session?.user} />
      <button
        onClick={(e) => {
          signOut;
        }}
      ></button>
    </div>;
  }

  return (
    <>
      <button type="button" onClick={login}>
        Login
      </button>
      <button
        onClick={(e) => {
          signOut;
        }}
      >
        Logout
      </button>
    </>
  );
}
