import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const EmployeeDetailsProfileHeaderSkeleton = () => {
  return (
    <Card className="min-h-[304px] sm:min-h-[130px]">
      <CardContent className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full">
          <Skeleton className="size-20 rounded-full" />
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
              <Skeleton className="h-8 w-46" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-[22px] w-14" />
                <Skeleton className="h-[22px] w-14" />
              </div>
            </div>
            <div className="flex flex-col text-center sm:text-start gap-1">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>
        <div className="flex mx-auto sm:mx-0 items-center gap-1">
          <Skeleton className="h-9 w-34" />
          <Skeleton className="size-9" />
        </div>
      </CardContent>
    </Card>
  );
};
