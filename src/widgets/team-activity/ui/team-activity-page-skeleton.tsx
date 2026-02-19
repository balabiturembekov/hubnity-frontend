import {
  DashboardPageHeaderSkeleton,
  ListItemsSkeleton,
  StatsCardsSkeleton,
} from "@/widgets/skeleton";

export const TeamActivityPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton />
      <div className="grid gap-4 p-2 sm:p-6">
        <StatsCardsSkeleton count={3} />
        <ListItemsSkeleton />
      </div>
    </main>
  );
};
