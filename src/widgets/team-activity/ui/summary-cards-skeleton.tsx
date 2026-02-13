import { useUser } from "@/entities/user";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const SummaryCardsSkeleton = () => {
  const { isAdmin } = useUser();

  return (
    <div
      className={`grid gap-4 ${isAdmin ? "md:grid-cols-4" : "md:grid-cols-3"}`}
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
  );
};
