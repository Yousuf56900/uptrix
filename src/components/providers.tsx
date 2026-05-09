"use client";

import { Toaster } from "sonner";

import { AuthProvider } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        richColors
        closeButton
        position="top-center"
        theme="dark"
        toastOptions={{
          classNames: {
            toast:
              "group border border-white/10 bg-[#111827] text-foreground shadow-xl",
            title: "font-medium",
            description: "text-muted-foreground",
          },
        }}
      />
    </AuthProvider>
  );
}
