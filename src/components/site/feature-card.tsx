import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  body: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, body, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg  bg-background p-6 shadow-sm backdrop-blur-sm transition-colors border hover:border-brand/25",
        className
      )}
    >
      <div className="mb-1 inline-flex size-11 items-center  rounded-xl ">
        <Icon className="size-5 text-brand" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
