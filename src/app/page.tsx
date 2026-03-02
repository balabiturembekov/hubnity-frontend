import {
  BenefitSection,
  CTASection,
  FeaturesSection,
  HeroSection,
  HowWeWorkSection,
  StatsSection,
} from "@/widgets/landing-page";
import { SiteShell } from "@/widgets/site/ui/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowWeWorkSection />
        <StatsSection />
        <BenefitSection />
        <CTASection />
      </main>
    </SiteShell>
  );
}
