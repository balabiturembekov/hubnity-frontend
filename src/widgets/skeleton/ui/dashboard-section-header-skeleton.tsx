import { Skeleton } from "@/shared/ui/skeleton";

interface DashboardSectionHeaderSkeletonProps {
  isTwoLines?: boolean;
  isBigFirstLine?: boolean;
}

export const DashboardSectionHeaderSkeleton = ({
  isTwoLines = false,
  isBigFirstLine = false,
}: DashboardSectionHeaderSkeletonProps) => {
  return (
    <div>
      <Skeleton className={`h-${isBigFirstLine ? "9" : "7"} w-48`} />
      {isTwoLines && <Skeleton className="h-4 w-64 mt-2" />}
    </div>
  );
};
