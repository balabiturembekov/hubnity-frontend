"use client";

import { Trophy } from "lucide-react";
import { benefitCards } from "@/widgets/landing-page/consts";
import { BenefitCard } from "./benefit-card";
import { SectionHeader } from "./section-header";

export const BenefitsCardsSection = () => {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-title"
      className="container mx-auto space-y-12 px-4 py-12 sm:space-y-16 sm:py-16 md:space-y-20 md:py-20 lg:space-y-24 lg:py-24 scroll-mt-14 lg:-scroll-mt-2"
    >
      <SectionHeader
        sectionId="benefits-title"
        title="Why Teams Choose Hubnity for Time Tracking"
        description="Our intuitive interface makes even the most complex time tracking effortless."
        badge="Benefits"
        Icon={Trophy}
      />
      <ul className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8 2xl:grid-cols-5 2xl:gap-10 list-none p-0 m-0">
        {benefitCards.map((item, index) => (
          <BenefitCard key={item.id} {...item} index={index} />
        ))}
      </ul>
    </section>
  );
};
