import type { InfiniteData } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { GetAllNotificationsRes } from "@/entities/notifications";
import { notificationService } from "@/entities/notifications";
import { queryClient } from "@/shared/config/query-client";
import { handleError } from "@/shared/lib/utils";

const readAtNow = () => new Date().toISOString();

export const useMarkAllNotificationsAsReadMutation = () =>
  useMutation({
    mutationKey: ["markAllNotificationsAsReadMutation"],
    mutationFn: notificationService.markAllAsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      await queryClient.cancelQueries({
        queryKey: ["unreadNotificationsCount"],
      });

      const prevNotifications = queryClient.getQueriesData<
        InfiniteData<GetAllNotificationsRes>
      >({
        queryKey: ["notifications", "infinite"],
      });
      const prevCount = queryClient.getQueryData<{ count: number }>([
        "unreadNotificationsCount",
      ]);

      queryClient.setQueriesData<InfiniteData<GetAllNotificationsRes>>(
        { queryKey: ["notifications", "infinite"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => ({
                ...item,
                readAt: readAtNow(),
              })),
            })),
          };
        },
      );

      queryClient.setQueryData<{ count: number }>(
        ["unreadNotificationsCount"],
        () => ({ count: 0 }),
      );

      return { prevNotifications, prevCount };
    },
    onError: (e, _v, context) => {
      if (context?.prevNotifications) {
        context.prevNotifications.forEach(([key, data]) => {
          if (data) queryClient.setQueryData(key, data);
        });
      }
      if (context?.prevCount !== undefined) {
        queryClient.setQueryData(
          ["unreadNotificationsCount"],
          context.prevCount,
        );
      }
      toast.error(handleError(e));
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
      void queryClient.invalidateQueries({
        queryKey: ["unreadNotificationsCount"],
      });
    },
  });
