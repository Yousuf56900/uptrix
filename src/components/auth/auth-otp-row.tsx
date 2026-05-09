"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  id?: string;
};

export function AuthOtpRow({ value, onChange, disabled, error, id }: Props) {
  return (
    <div className="flex w-full flex-col items-center space-y-2">
      <span className="block text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-100/75">
        Verification Code
      </span>
      <InputOTP
        id={id}
        maxLength={6}
        value={value}
        onChange={onChange}
        disabled={disabled}
        containerClassName="flex w-full justify-center"
        pattern="^[0-9]*$"
        inputMode="numeric"
        aria-invalid={!!error}
      >
        <InputOTPGroup className="flex gap-1.5 sm:gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={cn(
                "!h-11 !w-9 rounded-lg !border border-white/15 bg-[#0f172a] text-base font-semibold text-white sm:!w-11",
                error && "!border-red-500/50"
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error ? (
        <p className="text-center text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
