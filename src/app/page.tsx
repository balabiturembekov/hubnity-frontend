import {
  BenefitsCardsSection,
  FeaturesSection,
  HeroSection,
  HowWeWorkSection,
  QuestionsSection,
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
        <QuestionsSection />
        {/*<StatsSection />*/}
        {/*<CTASection />*/}
      </main>
    </SiteShell>
  );
}
