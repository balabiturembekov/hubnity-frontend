import {
  DashboardPageHeaderSkeleton,
  ListItemsSkeleton,
  ProfileTimeStatisticsSkeleton,
  StatsCardsSkeleton,
} from "@/widgets/skeleton";

export const ProfilePageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton />
      <div className="grid grid-cols-2 gap-4 p-2 sm:p-6">
        <div className="col-span-2">
          <StatsCardsSkeleton />
        </div>
        {[1, 2].map((i) => (
          <ProfileTimeStatisticsSkeleton key={i} />
        ))}
        <ListItemsSkeleton />
      </div>
    </main>
  );
};
