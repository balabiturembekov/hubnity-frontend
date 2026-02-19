import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const GraphSkeleton = () => {
  return (
    <Card className="min-h-[418px] h-full flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  );
};
