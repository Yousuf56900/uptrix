import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AuthCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#10221c] shadow-xl shadow-black/40",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AuthCardFooterBar({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-white/10 bg-black/25 px-6 py-4 text-center">
      {children}
    </div>
  );
}
