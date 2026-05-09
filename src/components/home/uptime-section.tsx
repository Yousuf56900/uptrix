import { Globe, Settings2, ShieldCheck } from "lucide-react";

import { FeatureCard } from "@/components/site/feature-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Container } from "@/components/layout/container";
import { uptimeSection } from "@/content/site";

const iconMap = {
  globe: Globe,
  "shield-check": ShieldCheck,
  "settings-2": Settings2,
} as const;

export function UptimeSection() {
  return (
    <section
      id="features"
      className="scroll-mt-20  bg-[#10201f]  py-16 sm:py-20"
    >
      <Container className="space-y-12">
        <SectionHeading
          title={uptimeSection.title}
          subtitle={uptimeSection.subtitle}
          icon={ShieldCheck}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {uptimeSection.features.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <FeatureCard key={f.title} icon={Icon} title={f.title} body={f.body} />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
