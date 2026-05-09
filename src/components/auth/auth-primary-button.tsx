import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuthPrimaryButton({
  children,
  className,
  loading,
  ...props
}: ComponentProps<typeof Button> & { loading?: boolean }) {
  return (
    <Button
      type="submit"
      disabled={loading || props.disabled}
      className={cn(
        "h-12 w-full rounded-xl bg-gradient-to-r from-brand to-emerald-800 cursor-pointer text-base font-semibold text-white shadow-lg shadow-brand/25 hover:from-brand/90 hover:to-emerald-800/90 disabled:opacity-60",
        className
      )}
      {...props}
    >
      <span className="flex w-full items-center justify-center gap-2">
        {loading ? "Please wait…" : children}
        {!loading ? <ArrowRight className="size-5" aria-hidden /> : null}
      </span>
    </Button>
  );
}
