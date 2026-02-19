import { Skeleton } from "@/shared/ui/skeleton";

interface DashboardSectionHeaderSkeletonProps {
  isTwoLines?: boolean;
}

export const DashboardSectionHeaderSkeleton = ({
  isTwoLines = false,
}: DashboardSectionHeaderSkeletonProps) => {
  return (
    <div>
      <Skeleton className="h-7 w-48 mb-2" />
      {isTwoLines && <Skeleton className="h-4 w-64" />}
    </div>
  );
};
