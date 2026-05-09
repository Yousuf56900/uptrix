import { PageHeader } from "@/components/layout/page-header";
import { PageFooter } from "@/components/layout/page-footer";
import { Container } from "@/components/layout/container";
import { AnalyticsSection } from "@/components/home/analytics-section";
import { CtaBanner } from "@/components/home/cta-banner";
import { Intro } from "@/components/home/intro-section";
import { IntervalsSection } from "@/components/home/intervals-section";
import { UptimeSection } from "@/components/home/uptime-section";

export default function Home() {
  return (
    <>
      <PageHeader />
      <main className="flex-1">
        <Intro />
        <UptimeSection />
        <IntervalsSection />
        <AnalyticsSection />
        <section
          id="about"
          className="scroll-mt-20 py-10 text-center text-sm text-muted-foreground"
        >
          <Container id="customers">
            Trusted by teams from fast-growing startups to enterprise SRE orgs.
          </Container>
        </section>
        <CtaBanner />
      </main>
      <PageFooter />
    </>
  );
}
