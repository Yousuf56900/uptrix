import { BadgeCheck, ShieldCheck } from "lucide-react";

export function AuthComplianceFooter() {
  return (
    <footer className="relative z-10 mt-auto py-8 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-brand" aria-hidden />
          SSL Encrypted
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BadgeCheck className="size-3.5 text-brand" aria-hidden />
          PCI Compliant
        </span>
      </div>
    </footer>
  );
}
