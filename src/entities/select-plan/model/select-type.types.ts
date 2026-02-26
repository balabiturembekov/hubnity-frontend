export type SelectType = "monthly" | "quarterly" | "yearly";

export interface SelectPlan {
  id: string;
  name: string;
  price: Record<SelectType, number>;
  features: string[];
  isPopular: boolean;
}
