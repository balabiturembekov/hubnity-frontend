import {
  type DashboardAnalyticsPeriod,
  useAnalyticsStore,
} from "@/entities/dashboard-analytics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type PeriodValueType = {
  id: string;
  value: DashboardAnalyticsPeriod;
  label: string;
};

const periodValues: PeriodValueType[] = [
  {
    id: "1",
    value: "7days",
    label: "Last 7 days",
  },
  {
    id: "2",
    value: "30days",
    label: "Last 30 days",
  },
  {
    id: "3",
    value: "90days",
    label: "Last 90 days",
  },
  {
    id: "4",
    value: "this_year",
    label: "This year",
  },
];

export const ReportsPeriodSelect = () => {
  const { period, setPeriod } = useAnalyticsStore();

  return (
    <Select value={period} onValueChange={setPeriod}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {periodValues.map((item) => (
          <SelectItem key={item.id} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
