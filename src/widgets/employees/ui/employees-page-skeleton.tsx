import {
  DashboardPageHeaderSkeleton,
  DashboardSectionHeaderSkeleton,
  FilterSkeleton,
  StatsCardsSkeleton,
  TableSkeleton,
} from "@/widgets/skeleton";

export const EmployeesPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton />
      <div className="grid gap-4 p-2 sm:p-6">
        <StatsCardsSkeleton />
        <FilterSkeleton />
        <DashboardSectionHeaderSkeleton isTwoLines />
        <TableSkeleton />
      </div>
    </main>
  );
};
