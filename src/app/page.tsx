import {
  BenefitsCardsSection,
  FeaturesSection,
  HeroSection,
  HowWeWorkSection,
  ReviewsSection,
} from "@/widgets/landing-page";
import { SiteShell } from "@/widgets/site/ui/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <main className="overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <HowWeWorkSection />
        <BenefitsCardsSection />
        <ReviewsSection />
        {/*<StatsSection />*/}
        {/*<BenefitSection />*/}
        {/*<CTASection />*/}
      </main>
    </SiteShell>
  );
}
