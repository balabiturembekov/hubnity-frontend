import {
  BenefitsCardsSection,
  FeaturesSection,
  HeroSection,
  HowWeWorkSection,
} from "@/widgets/landing-page";
import { SiteShell } from "@/widgets/site/ui/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowWeWorkSection />
        <BenefitsCardsSection />
        {/*<StatsSection />*/}
        {/*<BenefitSection />*/}
        {/*<CTASection />*/}
      </main>
    </SiteShell>
  );
}
