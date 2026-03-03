import {
  BenefitsCardsSection,
  FeaturesSection,
  HeroSection,
  HowWeWorkSection,
  QuestionsSection,
  ReviewsSection,
  SelectPlanSection,
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
        <SelectPlanSection />
        <QuestionsSection />
        {/*<StatsSection />*/}
        {/*<CTASection />*/}
      </main>
    </SiteShell>
  );
}
