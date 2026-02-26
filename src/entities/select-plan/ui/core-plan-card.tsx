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
}

export const CorePlanCard = ({ plan, period }: CorePlanCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader>
        <CardTitle className="text-4xl flex items-start justify-between">
          {plan.name}
          {plan.isPopular && (
            <Badge variant="outline" className="border-primary text-primary">
              Popular
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-2xl space-x-1">
          <span className="font-bold text-black">{`${plan.price[period]}$`}</span>
          <span className="text-sm">/</span>
          <span className="text-sm">{period}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className={cn(
            "w-full",
            !plan.isPopular &&
              "border-primary text-primary hover:bg-primary/5 hover:text-primary",
          )}
          variant={plan.isPopular ? "default" : "outline"}
        >
          Select
        </Button>
      </CardContent>
      <CardFooter>
        <CardDescription className="space-y-2">
          {plan.features.map((feature) => (
            <PlanFeature key={feature} feature={feature} />
          ))}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

const PlanFeature = ({ feature }: { feature: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Check className="h-4 w-4 text-primary" />
      <p>{feature}</p>
    </div>
  );
};
