import { DollarSign, Shield, UserCheck, Users } from "lucide-react";
import { StatsCard } from "@/entities/stats";
import { useEmployeeStats } from "@/entities/user";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const EmployeesStats = () => {
  const { stats, isLoading } = useEmployeeStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["total", "active", "admins", "rate"].map((type) => (
          <Card
            key={`skeleton-${type}`}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-1" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
