import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import type { SelectPlan, SelectType } from "../model/select-type.types";

interface CorePlanCardProps {
  plan: SelectPlan;
  period: SelectType;
  mounted: boolean;
}

export const CorePlanCard = ({ plan, period, mounted }: CorePlanCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: period === "monthly" && !mounted ? 0 : 1,
        y: period === "monthly" && !mounted ? 75 : 0,
      }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "transition-all hover:shadow-lg h-full",
          plan.isPopular
            ? "border-primary/40 lg:h-[calc(100%+28px)] bg-primary/3"
            : "lg:mt-7",
        )}
      >
        <CardHeader>
          <CardTitle className="text-4xl flex items-start justify-between">
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              className="font-bold bg-[linear-gradient(to_right,var(--color-primary),#141AE691,var(--color-primary))] bg-size-[200%_auto] bg-clip-text text-transparent"
            >
              {plan.name}
            </motion.span>
            {plan.isPopular && (
              <Badge
                variant="default"
                className="bg-primary/10 font-medium border-none text-primary"
              >
                Popular
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-2xl space-x-1">
            <span className="font-bold text-5xl text-black">{`$${plan.price[period]}`}</span>
            <span className="text-sm">/</span>
            <span className="text-base">{period}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            aria-label={`Select ${plan.name} plan`}
            className={cn(
              "w-full",
              !plan.isPopular &&
                "text-primary bg-primary/10 hover:bg-primary/15",
            )}
            variant="default"
          >
            Select
          </Button>
        </CardContent>
        <CardFooter>
          <CardDescription
            role="list"
            aria-label="Plan features"
            className="space-y-2 border-t w-full pt-4"
          >
            {plan.features.map((feature) => (
              <PlanFeature key={feature} feature={feature} />
            ))}
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PlanFeature = ({ feature }: { feature: string }) => {
  return (
    <div role="listitem" className="flex items-center gap-2">
      <Check aria-hidden="true" className="size-4 text-primary" />
      <p className="text-base">{feature}</p>
    </div>
  );
};
