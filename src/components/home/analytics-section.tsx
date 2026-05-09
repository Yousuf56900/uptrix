import { GitCompare, MapPin, TrendingUp, Webhook } from "lucide-react";

import { FeatureCard } from "@/components/site/feature-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Container } from "@/components/layout/container";
import { analyticsSection } from "@/content/site";

const iconMap = {
  "trending-up": TrendingUp,
  "map-pin": MapPin,
  "git-compare": GitCompare,
  webhook: Webhook,
} as const;

export function AnalyticsSection() {
  return (
    <section
      id="analytics"
      className="scroll-mt-20  py-16 sm:py-20"
    >
      <Container className="space-y-12">
        <SectionHeading
          title={analyticsSection.title}
          subtitle={analyticsSection.subtitle}
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsSection.features.map((f) => {
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
