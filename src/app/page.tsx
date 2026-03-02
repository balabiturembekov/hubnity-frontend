import {
  BenefitSection,
  CTASection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  StatsSection,
} from "@/widgets/landing-page";
import { SiteShell } from "@/widgets/site/ui/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <BenefitSection />
        <CTASection />
      </main>
    </SiteShell>
  );
}
