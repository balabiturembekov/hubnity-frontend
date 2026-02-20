import { DollarSign, Shield, UserCheck, Users } from "lucide-react";
import { StatsCard } from "@/entities/stats";
import { useEmployeeStats } from "@/entities/user";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const EmployeesStats = () => {
  const { stats, isLoading } = useEmployeeStats();

  if (isLoading) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Employees"
        icon={Users}
        stat={stats.total}
        description={
          <p className="text-xs text-muted-foreground">
            {stats.active} active, {stats.inactive} inactive
          </p>
        }
        color="green"
      />
      <StatsCard
        title="Active"
        icon={UserCheck}
        stat={stats.active}
        description={
          <p className="text-xs text-muted-foreground">
            {stats.total > 0
              ? Math.round((stats.active / stats.total) * 100)
              : 0}
            % of total
          </p>
        }
        color="blue"
      />
      <StatsCard
        title="Admins"
        icon={Shield}
        stat={stats.admins}
        description={
          <p className="text-xs text-muted-foreground">
            {stats.employees} employees
          </p>
        }
        color="red"
      />
      <StatsCard
        title="Avg. Hourly Rate"
        icon={DollarSign}
        stat={stats.avgRate > 0 ? `$${stats.avgRate.toFixed(2)}` : "-"}
        description={
          <p className="text-xs text-muted-foreground">
            {stats.withRate} employees with rate
          </p>
        }
        color="yellow"
      />
    </div>
  );
};
