import { useInfiniteQuery } from "@tanstack/react-query";
import type { GetAllNotificationsReq } from "@/entities/notifications";
import { notificationService } from "@/entities/notifications/api/notificiation.service";

const LIMIT = 20;

export const useGetNotificationsInfiniteQuery = (
  params?: Omit<GetAllNotificationsReq, "offset" | "limit">,
) =>
  useInfiniteQuery({
    queryKey: ["notifications", "infinite", params],
    queryFn: ({ pageParam = 0 }) =>
      notificationService.getAll({
        ...params,
        limit: LIMIT,
        offset: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.reduce((acc, p) => acc + p.items.length, 0);
      return fetched < lastPage.total ? fetched : undefined;
    },
  });
