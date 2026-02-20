import { Skeleton } from "@/shared/ui/skeleton";

interface DashboardPageHeaderSkeletonProps {
  isButtonVisible?: boolean;
}

export const DashboardPageHeaderSkeleton = ({
  isButtonVisible = true,
}: DashboardPageHeaderSkeletonProps) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between min-h-[${isButtonVisible ? "157px" : "121px"}] sm:min-h-[109px] py-6 px-2 sm:px-6 gap-4`}
    >
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton
          className={`h-4 w-64 ${!isButtonVisible ? "mb-[37px] sm:mb-0" : ""}`}
        />
      </div>
      {isButtonVisible && <Skeleton className="h-9 w-32" />}
    </div>
  );
};
