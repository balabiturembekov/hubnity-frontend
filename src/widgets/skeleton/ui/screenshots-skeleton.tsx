import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const ScreenshotsSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-4 items-center mb-4">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className="w-full max-w-[500px] aspect-20/13"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
