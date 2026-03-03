export const selectTypes = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "quarterly",
    label: "Quarterly",
  },
  {
    value: "yearly",
    label: "Yearly",
  },
];
export type SelectType = (typeof selectTypes)[number]["value"];

export interface SelectPlan {
  id: string;
  name: string;
  price: Record<SelectType, number>;
  features: string[];
  isPopular: boolean;
}
