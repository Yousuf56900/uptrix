import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 font-bold tracking-tight text-white", className)}
    >
      <span className="relative flex size-8 items-center justify-center" aria-hidden>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="text-brand"
        >
          <path
            d="M16 2L30 16L16 30L2 16L16 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M16 9L23 16L16 23L9 16L16 9Z"
            fill="currentColor"
            className="opacity-90"
          />
        </svg>
      </span>
      <span className="text-lg">Uptrix</span>
    </Link>
  );
}
