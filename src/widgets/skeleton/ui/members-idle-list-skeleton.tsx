import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const MembersIdleListSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="max-w-96 h-4" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="flex justify-between items-end gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="max-w-48 h-6" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </div>
                <Skeleton className="hidden sm:block h-9 w-48" />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
