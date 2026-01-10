"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { Toaster } from "sonner";

export function Providers({ children }) {
  return (
    <ProgressProvider>
      {children}
      <Toaster position="top-right" richColors />
    </ProgressProvider>
  );
}
