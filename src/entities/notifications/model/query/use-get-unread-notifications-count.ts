import { useQuery } from "@tanstack/react-query";
import { notificationService } from "@/entities/notifications/api/notificiation.service";

export const useGetUnreadNotificationsCount = () =>
  useQuery({
    queryKey: ["unreadNotificationsCount"],
    queryFn: notificationService.getUnreadCount,
  });
