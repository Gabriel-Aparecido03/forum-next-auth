"use client";

import { Toaster } from "@/context/toast-context";
import { queryClient } from "@/lib/query";
import store from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "./auth-provider";

export function Wrapper({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </Provider>
  );
}
