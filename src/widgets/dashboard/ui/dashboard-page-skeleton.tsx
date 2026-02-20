import {
  DashboardPageHeaderSkeleton,
  DashboardSectionHeaderSkeleton,
  FilterSkeleton,
  GraphSkeleton,
  ScreenshotsSkeleton,
  StatsCardsSkeleton,
  TableSkeleton,
} from "@/widgets/skeleton";

export const DashboardPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton />
      <div className="grid grid-cols-2 gap-4 p-2 sm:p-6">
        <div className="col-span-2 grid gap-4">
          <DashboardSectionHeaderSkeleton />
          <StatsCardsSkeleton />
          <DashboardSectionHeaderSkeleton />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <GraphSkeleton />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <GraphSkeleton />
        </div>
        <div className="col-span-2 grid gap-4">
          <DashboardSectionHeaderSkeleton />
          <ScreenshotsSkeleton />
          <DashboardSectionHeaderSkeleton />
          <FilterSkeleton />
          <TableSkeleton />
        </div>
      </div>
    </main>
  );
};
