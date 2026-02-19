import {
  DashboardPageHeaderSkeleton,
  DashboardSectionHeaderSkeleton,
  GraphSkeleton,
  StatsCardsSkeleton,
} from "@/widgets/skeleton";

export const ReportsPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton />
      <div className="grid grid-cols-2 gap-4 p-2 sm:p-6">
        <div className="col-span-2">
          <StatsCardsSkeleton />
        </div>
        <div className="col-span-2">
          <DashboardSectionHeaderSkeleton />
        </div>
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <GraphSkeleton key={i} />
          ))}
        </div>
        <div className="col-span-2">
          <GraphSkeleton />
        </div>
      </div>
    </main>
  );
};
