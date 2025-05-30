"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const QueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
