import {
  DashboardPageHeaderSkeleton,
  DashboardSectionHeaderSkeleton,
  FilterSkeleton,
  TableSkeleton,
} from "@/widgets/skeleton";

export const TrackingPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton />
      <div className="grid gap-4 p-2 sm:p-6">
        <DashboardSectionHeaderSkeleton />
        <FilterSkeleton />
        <TableSkeleton />
      </div>
    </main>
  );
};
