import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { introduction } from "@/content/site";
import Image from "next/image";
import { backgroundBorder } from "@/images";

export function Intro() {
  return (
    <section
      id="product"
      className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_90%_60%_at_70%_-30%,rgba(0,209,142,0.12),transparent_55%)]"
    >
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            {introduction.eyebrow}
          </p>
          <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[2.75rem] lg:leading-[1.08]">
            {introduction.titleLead}{" "}
            <span className="text-brand">{introduction.titleAccent}</span>
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {introduction.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-brand px-6 text-base font-semibold text-zinc-950 shadow-lg shadow-brand/20 hover:bg-brand/90 sm:h-11"
              asChild
            >
              <Link href="/register">{introduction.primaryCta}</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 gap-1 text-white hover:bg-white/5 sm:h-11"
              asChild
            >
              <Link href={introduction.demoHref}>
                {introduction.secondaryCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative isolate lg:justify-self-end">
          <div
            aria-hidden
            className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0d1512] p-4 shadow-2xl shadow-black/50 ring-1 ring-white/5"
          >
        <Image src={backgroundBorder} alt="backgroundBorder"  width={1000} height={1000} />
          </div>
        </div>
      </Container>
    </section>
  );
}
