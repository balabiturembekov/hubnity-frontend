import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const MembersIdleSettingsFormSkeleton = () => {
  return (
    <Card className="min-h-[266px] sm:min-h-[208px] xl:min-h-[158px] justify-center">
      <CardContent>
        <div className="flex flex-col gap-4 xl:flex-row justify-between xl:items-end">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="max-w-96 h-4" />
          </div>

          <div className="flex flex-col sm:flex-row sm:ml-auto xl:ml-0 gap-3">
            <Skeleton className="w-full sm:w-48 h-11" />
            <div className="flex gap-3 items-end">
              <Skeleton className="w-full sm:w-48 h-9" />
              <Skeleton className="w-24 h-9" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
