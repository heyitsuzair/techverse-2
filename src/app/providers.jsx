"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";

export function Providers({ children }) {
  return (
    <ProgressProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ProgressProvider>
  );
}
