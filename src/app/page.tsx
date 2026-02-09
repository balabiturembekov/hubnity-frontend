import {
  BenefitSection,
  CTASection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  StatsSection,
} from "@/widgets/landing-page";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitSection />
      <CTASection />
    </main>
  );
}
