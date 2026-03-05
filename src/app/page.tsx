import {
  BenefitsCardsSection,
  FeaturesSection,
  HeroSection,
  HowWeWorkSection,
  LandingStructuredData,
  QuestionsSection,
  ReviewsSection,
  SelectPlanSection,
} from "@/widgets/landing-page";
import { SiteShell } from "@/widgets/site/ui/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <LandingStructuredData />
      <HeroSection />
      <FeaturesSection />
      <HowWeWorkSection />
      <BenefitsCardsSection />
      <ReviewsSection />
      <SelectPlanSection />
      <QuestionsSection />
    </SiteShell>
  );
}
