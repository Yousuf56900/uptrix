import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  icon: Icon,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {Icon ? (
        <div
          className={cn(
            "flex items-center gap-2",
            align === "center" && "justify-center"
          )}
        >
          <Icon className="size-7 shrink-0 text-brand" aria-hidden />
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
        </div>
      ) : (
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
      )}
      {subtitle ? (
        <p
          className={cn(
            "text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
