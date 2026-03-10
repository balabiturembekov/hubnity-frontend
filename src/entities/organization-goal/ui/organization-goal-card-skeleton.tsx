import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const OrganizationGoalCardSkeleton = () => {
  return (
    <Card className="relative gap-4 h-full">
      <CardHeader className="flex items-center justify-between">
        <Skeleton className="w-2/3 h-6" />
        <Skeleton className="size-5 rounded-[4px]" />
      </CardHeader>
      <CardContent className="flex-1 text-muted-foreground text-sm">
        <Skeleton className="w-full h-5" />
      </CardContent>
    </Card>
  );
};
