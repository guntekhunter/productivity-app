"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

// @ts-ignore
export default function DarkTheme({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
