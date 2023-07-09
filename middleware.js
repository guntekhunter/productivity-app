import React from "react";
import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export default function middleware(req) {
  let verify = req.cookies.get("loggedin");
  let url = req.url;

  if (!verify && url.includes("/chart")) {
    return NextResponse.redirect(
      "https://productivity-8d37mcwjr-guntekhunter.vercel.app/"
    );
  }
  if (!verify && url.includes("/")) {
    Cookies.remove("loggedin");
  }
}
