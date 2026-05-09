import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthFieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
  labelClassName?: string;
} & Omit<ComponentProps<typeof Input>, "id">;

export function AuthField({
  id,
  label,
  icon: Icon,
  error,
  className,
  labelClassName,
  ...inputProps
}: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={cn(
          "block text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-100/75",
          labelClassName
        )}
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-100/45"
          aria-hidden
        />
        <Input
          id={id}
          aria-invalid={!!error}
          className={cn(
            "h-11 rounded-xl border-white/10 bg-[#0f172a] pl-10 text-sm text-white placeholder:text-zinc-500 focus-visible:border-brand/60 focus-visible:ring-brand/25",
            error && "border-red-500/60",
            className
          )}
          {...inputProps}
        />
      </div>
      {error ? (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
