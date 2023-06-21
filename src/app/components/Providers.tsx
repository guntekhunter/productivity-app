"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

// @ts-ignore
const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
