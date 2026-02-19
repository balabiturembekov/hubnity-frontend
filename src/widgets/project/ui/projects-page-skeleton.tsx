import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  DashboardPageHeaderSkeleton,
  DashboardSectionHeaderSkeleton,
  FilterSkeleton,
  StatsCardsSkeleton,
} from "@/widgets/skeleton";

export const ProjectsPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton />
      <div className="grid gap-4 p-2 sm:p-6">
        <StatsCardsSkeleton />
        <FilterSkeleton />
        <DashboardSectionHeaderSkeleton />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};
