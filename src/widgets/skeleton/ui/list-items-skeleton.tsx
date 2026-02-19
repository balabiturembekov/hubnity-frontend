import { Skeleton } from "@/shared/ui/skeleton";

export const ListItemsSkeleton = () => {
  return (
    <div className="col-span-full flex flex-col gap-4">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );
};
