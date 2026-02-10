import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
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
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
