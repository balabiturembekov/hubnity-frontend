"use client";

import { Wallet } from "lucide-react";
import { SelectPlanTabs } from "@/features/select-plan";
import { SectionHeader } from "./section-header";

export const SelectPlanSection = () => {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="pb-20 py-8 container mx-auto px-4 mt-4 space-y-18 scroll-mt-18 sm:scroll-mt-26 lg:scroll-mt-14"
    >
      <SectionHeader
        sectionId="pricing-title"
        title="Hubnity Pricing Plans for Teams & Freelancers"
        description="Choose the perfect plan for your team. Start your 21-day free trial today and upgrade as your business grows."
        badge="Pricing"
        Icon={Wallet}
      />

      <SelectPlanTabs />
    </section>
  );
};
