import { Skeleton } from "@/shared/ui/skeleton";

export const DashboardPageHeaderSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between min-h-[157px] sm:min-h-[109px] py-6 px-2 sm:px-6 gap-4">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-9 w-32" />
    </div>
  );
};
