import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function BrandWordmark({
  icon: Icon,
  title = "Uptrix",
  iconClassName,
}: {
  icon: LucideIcon;
  title?: string;
  iconClassName?: string;
}) {
  return (
    <>
      <Icon
        className={cn("size-7 shrink-0 text-brand", iconClassName)}
        aria-hidden
      />
      <span className="text-lg font-bold tracking-tight text-white">{title}</span>
    </>
  );
}
