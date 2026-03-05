import { useEffect, useState } from "react";
import {
  CorePlanCard,
  corePlans,
  type SelectType,
  selectTypes,
} from "@/entities/select-plan";
import { cn } from "@/shared/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export const SelectPlanTabs = () => {
  const [period, setPeriod] = useState<SelectType>("monthly");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Tabs
      defaultValue="monthly"
      className="w-full gap-4"
      onValueChange={(value) => setPeriod(value as SelectType)}
    >
      <TabsList
        aria-label="Select billing period"
        className="mx-auto bg-primary/5 rounded-full py-5"
      >
        {selectTypes.map((type) => (
          <TabsTrigger
            key={type.value}
            value={type.value}
            className={cn(
              "rounded-full p-4 text-black",
              type.value !== period && "hover:bg-white/40",
            )}
          >
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {selectTypes.map((type) => (
        <TabsContent key={type.value} value={type.value}>
          <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-4">
            {corePlans.map((plan) => (
              <CorePlanCard
                key={plan.id}
                plan={plan}
                period={type.value}
                mounted={mounted}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
