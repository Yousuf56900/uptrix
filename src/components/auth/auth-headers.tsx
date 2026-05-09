import Link from "next/link";
import { Rocket, Shield } from "lucide-react";

import { AuthTopBar } from "@/components/auth/auth-shell";
import { BrandWordmark } from "@/components/auth/brand-wordmark";

export function AuthSignupHeader() {
  return (
    <AuthTopBar
      logo={<BrandWordmark icon={Rocket} />}
      end={
        <span className="hidden max-w-[240px] text-right text-xs leading-snug text-emerald-100/70 sm:inline md:max-w-none md:text-sm">
          Join the next generation of builders
        </span>
      }
    />
  );
}

export function AuthRecoveryHeader() {
  return (
    <AuthTopBar
      logo={<BrandWordmark icon={Shield} />}
      end={
        <div className="flex items-center gap-4 text-sm text-white sm:gap-6">
          <Link href="#" className="transition-colors hover:text-brand">
            Help Center
          </Link>
          <Link href="#" className="transition-colors hover:text-brand">
            Privacy Policy
          </Link>
        </div>
      }
    />
  );
}
