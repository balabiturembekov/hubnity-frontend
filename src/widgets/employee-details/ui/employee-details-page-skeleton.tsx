import { Skeleton } from "@/shared/ui/skeleton";
import {
  EmployeeDetailsProfileHeaderSkeleton,
  GraphSkeleton,
  StatsCardsSkeleton,
} from "@/widgets/skeleton";

export const EmployeeDetailsPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid gap-4 p-2 pt-6 sm:p-6">
        <Skeleton className="h-9 w-46" />
        <EmployeeDetailsProfileHeaderSkeleton />
        <StatsCardsSkeleton />
        <div>
          <Skeleton className="h-9 w-60 mb-2 mx-auto sm:mx-0" />
          <GraphSkeleton />
        </div>
      </div>
    </main>
  );
};
