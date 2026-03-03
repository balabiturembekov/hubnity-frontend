"use client";

import { SelectPlanTabs } from "@/features/select-plan";

export const CorePlans = () => {
  return (
    <section className="w-full">
      <div className="text-center space-y-3 mb-8 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold tracking-tight">Choose your plan</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-[1.6] max-w-md mx-auto">
          Select the plan that best suits your needs.
        </p>
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
          First 21 days automatically free
        </div>
      </div>

      <SelectPlanTabs />
    </section>
  );
};
