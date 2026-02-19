import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

interface StatsCardsSkeletonProps {
  count?: number;
}

export const StatsCardsSkeleton = ({ count = 4 }: StatsCardsSkeletonProps) => {
  return (
    <div
      className={`
        grid gap-4 
        ${count % 2 === 0 ? "sm:grid-cols-2" : ""} 
        xl:grid-cols-${count}
      `}
    >
      {Array.from({ length: count }, (_, i) => i).map((id) => (
        <Card key={id} className="min-h-[130px]">
          <CardContent className="flex justify-between items-center gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <div>
              <Skeleton className="size-16 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
