import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ctaBanner } from "@/content/site";
import { homeLogo } from "@/images";

export function CtaBanner() {
  return (
    <section id="pricing" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-brand px-6 py-14 shadow-xl shadow-brand/30 sm:min-h-[360px] sm:px-10 sm:py-16 md:min-h-[400px] md:py-20">
          <div
            className="pointer-events-none absolute -right-6 -top-2 z-0 select-none sm:right-0 sm:top-0 md:right-4 md:top-4"
            aria-hidden
          >
            <Image
              src={homeLogo}
              alt=""
              width={220}
              height={220}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 220px"
              className="h-auto w-[140px] opacity-[0.18] object-contain sm:w-[180px] sm:opacity-[0.16] md:w-[220px]"
              priority={false}
            />
          </div>

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center sm:max-w-3xl sm:gap-8">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {ctaBanner.title}
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-white/95 sm:text-lg">
              {ctaBanner.subtitle}
            </p>

            <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
              <Button
                size="lg"
                className="h-12 rounded-xl border-0 bg-zinc-950 px-8 font-semibold text-white shadow-lg shadow-black/20 hover:bg-zinc-900"
                asChild
              >
                <Link href="/register">{ctaBanner.primaryCta}</Link>
              </Button>
              <Button
                size="lg"
                className="h-12 rounded-xl border border-white/20 bg-white/15 px-8 font-semibold text-white backdrop-blur-sm hover:bg-white/25"
                asChild
              >
                <Link href={ctaBanner.salesHref}>{ctaBanner.secondaryCta}</Link>
              </Button>
            </div>

            <p className="text-xs leading-relaxed text-white/85 sm:text-sm">
              {ctaBanner.footerNote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
