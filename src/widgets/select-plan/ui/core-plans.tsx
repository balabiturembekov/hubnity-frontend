import {
  CorePlanCard,
  corePlans,
  type SelectType,
} from "@/entities/select-plan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

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

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="mx-auto">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <PlansList period="monthly" />
        </TabsContent>
        <TabsContent value="quarterly">
          <PlansList period="quarterly" />
        </TabsContent>
        <TabsContent value="yearly">
          <PlansList period="yearly" />
        </TabsContent>
      </Tabs>
    </section>
  );
};

interface PlansListProps {
  period: SelectType;
}

const PlansList = ({ period }: PlansListProps) => {
  return (
    <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-4">
      {corePlans.map((plan) => (
        <CorePlanCard key={plan.id} plan={plan} period={period} />
      ))}
    </div>
  );
};
