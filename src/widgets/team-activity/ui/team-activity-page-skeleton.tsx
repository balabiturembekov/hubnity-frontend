import { useUser } from "@/entities/user";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const TeamActivityPageSkeleton = () => {
  const { isAdmin } = useUser();

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div
          className={`grid gap-4 ${isAdmin ? "md:grid-cols-4" : "md:grid-cols-3"} pt-6`}
        >
          {(isAdmin ? [1, 2, 3, 4] : [1, 2, 3]).map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </main>
  );
};
