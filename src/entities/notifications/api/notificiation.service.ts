import type {
  GetAllNotificationsReq,
  GetAllNotificationsRes,
  GetUnreadCountRes,
  MarkAsReadAllRes,
  NotificationEntity,
} from "@/entities/notifications";
import { api } from "@/shared/config/api";

class NotificationService {
  async getAll(params?: GetAllNotificationsReq) {
    const res = await api.get<GetAllNotificationsRes>("/notifications", {
      params,
    });
    return res.data;
  }

  async getOne(id: string) {
    const res = await api.get<NotificationEntity>(`/notifications/${id}`);
    return res.data;
  }

  async getUnreadCount() {
    const res = await api.get<GetUnreadCountRes>("/notifications/unread-count");
    return res.data;
  }

  async markAllAsRead() {
    const res = await api.patch<MarkAsReadAllRes>("/notifications/read");
    return res.data;
  }

  async markOneAsRead(id: string) {
    const res = await api.patch<MarkAsReadAllRes>(`/notifications/${id}/read`);
    return res.data;
  }
}
export const notificationService = new NotificationService();
