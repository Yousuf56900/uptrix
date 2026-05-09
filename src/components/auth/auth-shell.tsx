import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col bg-background text-foreground",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.14),transparent_55%)]"
      )}
    >
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}

type AuthTopBarProps = {
  logo: ReactNode;
  end?: ReactNode;
};

export function AuthTopBar({ logo, end }: AuthTopBarProps) {
  return (
    <header className="border-b border-white/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {logo}
        </Link>
        {end ? (
          <div className="flex items-center gap-6 text-sm">{end}</div>
        ) : null}
      </div>
    </header>
  );
}
