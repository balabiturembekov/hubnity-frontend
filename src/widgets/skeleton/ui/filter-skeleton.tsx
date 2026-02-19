import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const FilterSkeleton = () => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full">
          <Skeleton className="h-9 w-full sm:flex-1" />
          <Skeleton className="h-9 w-full sm:w-45" />
        </div>
      </CardContent>
    </Card>
  );
};
