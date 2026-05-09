"use client";

import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
} & Omit<ComponentProps<typeof Input>, "id" | "type">;

export function AuthPasswordField({ id, label, icon: Icon, error, className, ...rest }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-100/75"
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
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          aria-invalid={!!error}
          className={cn(
            "h-11 rounded-xl border-white/10 bg-[#0f172a] pl-10 pr-11 text-sm text-white placeholder:text-zinc-500 focus-visible:border-brand/60 focus-visible:ring-brand/25",
            error && "border-red-500/60",
            className
          )}
          {...rest}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-emerald-100/55 hover:bg-white/5 hover:text-emerald-100"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error ? (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
