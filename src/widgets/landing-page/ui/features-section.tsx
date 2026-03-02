"use client";

import { Sparkle } from "lucide-react";
import { features } from "@/widgets/landing-page/consts";
import { FeatureCard } from "./feature-card";
import { SectionHeader } from "./section-header";

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 sm:py-32 container mx-auto px-4 mt-4 space-y-18 scroll-mt-2 lg:-scroll-mt-10"
    >
      <SectionHeader
        title="That Makes Easy Time Tracking"
        description="Track productivity, attendance with simple time tracker and timesheets to make your team's work easier."
        badge="Features"
        Icon={Sparkle}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
};
