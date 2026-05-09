import { Check } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { StatCard } from "@/components/site/stat-card";
import { Container } from "@/components/layout/container";
import { intervalsSection } from "@/content/site";

export function IntervalsSection() {
  return (
    <section
      id="precision"
      className="scroll-mt-20  py-16 sm:py-20"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-2 gap-4">
            {intervalsSection.stats.map((s) => (
              <StatCard key={s.value + s.label} value={s.value} label={s.label} />
            ))}
          </div>
          <div className="space-y-6">
            <SectionHeading
              title={intervalsSection.title}
              subtitle={intervalsSection.description}
            />
            <ul className="space-y-4">
              {intervalsSection.checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-white">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15">
                    <Check className="size-3.5 text-brand" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
