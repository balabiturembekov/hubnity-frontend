import { BellRing, Loader2 } from "lucide-react";
import { useCallback } from "react";
import {
  NotificationItem,
  useGetNotificationsInfiniteQuery,
} from "@/entities/notifications";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { Skeleton } from "@/shared/ui/skeleton";
import { EmptyState } from "@/widgets/empty-state";

interface Props {
  unreadOnly?: boolean;
}

export const NotificationList = ({ unreadOnly }: Props) => {
  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetNotificationsInfiniteQuery({ unreadOnly });

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver(handleIntersect, hasNextPage);

  if (isPending)
    return (
      <div className="flex flex-col gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static mapping
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col w-full gap-1">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-1/2 h-3" />
            </div>
          </div>
        ))}
      </div>
    );

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  if (!items.length) {
    return (
      <EmptyState
        title="No notifications"
        icon={<BellRing className="h-12 w-12 mx-auto" />}
        description="No notifications yet. Track time on projects to see updates here"
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {items.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>

      <div ref={sentinelRef} className="pb-4 w-full" />

      {isFetchingNextPage && (
        <div className="flex items-center justify-center pb-8">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </>
  );
};
